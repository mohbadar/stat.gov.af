import hashlib
import logging
import json

from flask import abort, flash, redirect, render_template, request, url_for, make_response
from flask_login import current_user, login_required, login_user, logout_user
from redash import __version__, limiter, models, serializers, settings, utils
from redash.tasks import QueryTask, record_event
from redash.handlers.base import BaseResource, get_object_or_404, paginate, filter_by_tags
from redash.authentication import current_org, get_login_url
from redash.authentication.account import (BadSignature, SignatureExpired,
                                           send_password_reset_email,
                                           validate_token)
from redash.serializers import serialize_public_dashboard, serialize_widget
from redash.handlers import routes
from redash.handlers.base import json_response, org_scoped_rule
from redash.version_check import get_latest_version
from redash.utils import collect_query_parameters, collect_parameters_from_request, gen_query_hash
from sqlalchemy.orm.exc import NoResultFound
from redash.tasks.queries import enqueue_query

logger = logging.getLogger(__name__)

ONE_YEAR = 60 * 60 * 24 * 365.25

@routes.route('/api/public/all_dashboards', methods=['GET'])
def public_all_dashboards():
    """
    Lists all accessible public dashboards.
    """
    logger.info("/api/public/all_dashboards - PublicDashboardListResource/get()")
    
    results = models.Dashboard.all_public()

    page = request.args.get('page', 1, type=int)
    page_size = request.args.get('page_size', 25, type=int)
    response = paginate(results, page, page_size, serialize_public_dashboard)
    # logging.debug("public_dashboards response: %s", response)
    
    # return json_response(response)
    headers = {}
    add_cors_headers(headers)
    data = json.dumps(response, cls=utils.JSONEncoder)
    return make_response(data, 200, headers)

@routes.route('/api/public/dashboards', methods=['GET'])
def public_dashboards():
    """
    Lists all accessible public dashboards.
    """
    logger.info("/api/public/dashboards - PublicDashboardListResource/get()")
    language = request.args.get('lang')
    # return all public dashboard of sepcific language and also those who does not set the language
    results = models.Dashboard.all_public()

    page = request.args.get('page', 1, type=int)
    page_size = request.args.get('page_size', 25, type=int)
    response = paginate(results, page, page_size, serialize_public_dashboard)
    # logging.debug("public_dashboards response: %s", response)
    
    # return json_response(response)
    headers = {}
    add_cors_headers(headers)
    data = json.dumps(response, cls=utils.JSONEncoder)
    return make_response(data, 200, headers)

@routes.route('/api/public/dashboards/<dashboard_slug>', methods=['GET'])
def ppublic_dashboard(self, dashboard_slug):
    dashboard = get_object_or_404(models.Dashboard.get_public_by_slug_and_org, dashboard_slug)
    response = serialize_public_dashboard(dashboard, with_widgets=True)

    api_key = models.ApiKey.get_by_object(dashboard)
    if api_key:
        response['public_url'] = url_for('redash.public_dashboard', token=api_key.api_key, org_slug=self.current_org.slug, _external=True)
        response['api_key'] = api_key.api_key
    logging.debug("Retrieves a public dashboard response: %s", response)

    return json_response(response)

@routes.route('/api/public/dashboards/tags', methods=['GET'])
def public_dashboard_tags():  
    return json_response({t[0]: t[1] for t in models.Dashboard.all_public_tags()})



@routes.route('/api/public/query_results/<query_result_id>.<filetype>', methods=['GET'])
@routes.route('/api/public/query_results/<query_result_id>', methods=['GET'])
@routes.route('/api/public/queries/<query_id>/results.<filetype>', methods=['GET'])
@routes.route('/api/public/queries/<query_id>/results/<query_result_id>.<filetype>', methods=['GET'])
def query_result(self, query_id=None, query_result_id=None, filetype='json'):
    """
    Retrieve query results.

    :param number query_id: The ID of the query whose results should be fetched
    :param number query_result_id: the ID of the query result to fetch
    :param string filetype: Format to return. One of 'json', 'xlsx', or 'csv'. Defaults to 'json'.

    :<json number id: Query result ID
    :<json string query: Query that produced this result
    :<json string query_hash: Hash code for query text
    :<json object data: Query output
    :<json number data_source_id: ID of data source that produced this result
    :<json number runtime: Length of execution time in seconds
    :<json string retrieved_at: Query retrieval date/time, in ISO format
    """
    # TODO:
    # This method handles two cases: retrieving result by id & retrieving result by query id.
    # They need to be split, as they have different logic (for example, retrieving by query id
    # should check for query parameters and shouldn't cache the result).
    logger.info("/api/public/query_results/ - QueryResultResource/get()")
    should_cache = query_result_id is not None

    parameter_values = collect_parameters_from_request(request.args)
    max_age = int(request.args.get('maxAge', 0))

    query_result = None

    if query_result_id:
        query_result = get_object_or_404(models.QueryResult.get_by_id_and_org, query_result_id, current_org)

    if query_id is not None:
        query = get_object_or_404(models.Query.get_by_id_and_org, query_id, current_org)

        if query_result is None and query is not None:
            if settings.ALLOW_PARAMETERS_IN_EMBEDS and parameter_values:
                query_result = run_query_sync(query.data_source, parameter_values, query.to_dict()['query'], max_age=max_age)
            elif query.latest_query_data_id is not None:
                query_result = get_object_or_404(models.QueryResult.get_by_id_and_org, query.latest_query_data_id, self.current_org)
            
        if query is not None and query_result is not None and current_user.is_api_user():
            if query.query_hash != query_result.query_hash:
                abort(404, message='No cached result found for this query.')

    if query_result:
        # require_access(query_result.data_source.groups, self.current_user, view_only)

        if isinstance(current_user, models.ApiUser):
            event = {
                'user_id': None,
                'org_id': current_org.id,
                'action': 'api_get',
                'timestamp': int(time.time()),
                'api_key': current_user.name,
                'file_type': filetype,
                'user_agent': request.user_agent.string,
                'ip': request.remote_addr
            }

            if query_id:
                event['object_type'] = 'query'
                event['object_id'] = query_id
            else:
                event['object_type'] = 'query_result'
                event['object_id'] = query_result_id

            # record_event.delay(event)

        if filetype == 'json':
            response = make_json_response(query_result)
        elif filetype == 'xlsx':
            response = make_excel_response(query_result)
        else:
            response = make_csv_response(query_result)

        if len(settings.ACCESS_CONTROL_ALLOW_ORIGIN) > 0:
            add_cors_headers(response.headers)

        if should_cache:
            response.headers.add_header('Cache-Control', 'private,max-age=%d' % ONE_YEAR)

        return response

    else:
        abort(404, message='No cached result found for this query.')


def options(query_id=None, query_result_id=None, filetype='json'):
    headers = {}
    self.add_cors_headers(headers)

    if settings.ACCESS_CONTROL_REQUEST_METHOD:
        headers['Access-Control-Request-Method'] = settings.ACCESS_CONTROL_REQUEST_METHOD

    if settings.ACCESS_CONTROL_ALLOW_HEADERS:
        headers['Access-Control-Allow-Headers'] = settings.ACCESS_CONTROL_ALLOW_HEADERS

    return make_response("", 200, headers)

def make_json_response(query_result):
    data = json.dumps({'query_result': query_result.to_dict()}, cls=utils.JSONEncoder)
    headers = {'Content-Type': "application/json"}
    return make_response(data, 200, headers)

def add_cors_headers(headers):
    if 'Origin' in request.headers:
        origin = request.headers['Origin']

        if set(['*', origin]) & settings.ACCESS_CONTROL_ALLOW_ORIGIN:
            headers['Access-Control-Allow-Origin'] = origin
            headers['Access-Control-Allow-Credentials'] = str(settings.ACCESS_CONTROL_ALLOW_CREDENTIALS).lower()

def make_csv_response(query_result):
    headers = {'Content-Type': "text/csv; charset=UTF-8"}
    return make_response(query_result.make_csv_content(), 200, headers)

def make_excel_response(query_result):
    headers = {'Content-Type': "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}
    return make_response(query_result.make_excel_content(), 200, headers)

@routes.route('/api/public/query_results', methods=['POST'])
def query_results():
    logging.info("entered to /api/public/query_results")
    """
    Execute a query (or retrieve recent results).

    :qparam string query: The query text to execute
    :qparam number query_id: The query object to update with the result (optional)
    :qparam number max_age: If query results less than `max_age` seconds old are available, return them, otherwise execute the query; if omitted, always execute
    :qparam number data_source_id: ID of data source to query
    """
    params = request.get_json(force=True)
    parameter_values = collect_parameters_from_request(request.args)

    query = params['query']
    max_age = int(params.get('max_age', -1))
    query_id = params.get('query_id', 'adhoc')

    data_source = models.DataSource.get_by_id_and_org(params.get('data_source_id'), current_org)

    # self.record_event({
    #     'action': 'execute_query',
    #     'timestamp': int(time.time()),
    #     'object_id': data_source.id,
    #     'object_type': 'data_source',
    #     'query': query
    # })

    result = run_query(data_source, parameter_values, query, query_id, max_age)
    return json_response(result)


def error_response(message):
    return {'job': {'status': 4, 'error': message}}, 400

#
# Run a parameterized query synchronously and return the result
# DISCLAIMER: Temporary solution to support parameters in queries. Should be
#             removed once we refactor the query results API endpoints and handling
#             on the client side. Please don't reuse in other API handlers.
#
def run_query_sync(data_source, parameter_values, query_text, max_age=0):
    query_parameters = set(collect_query_parameters(query_text))
    missing_params = set(query_parameters) - set(parameter_values.keys())
    if missing_params:
        raise Exception('Missing parameter value for: {}'.format(", ".join(missing_params)))

    if query_parameters:
        query_text = pystache.render(query_text, parameter_values)

    if max_age <= 0:
        query_result = None
    else:
        query_result = models.QueryResult.get_latest(data_source, query_text, max_age)

    query_hash = gen_query_hash(query_text)

    if query_result:
        logging.info("Returning cached result for query %s" % query_hash)
        return query_result

    try:
        started_at = time.time()
        data, error = data_source.query_runner.run_query(query_text, current_user)

        if error:
            logging.info('got bak error')
            logging.info(error)
            return None

        run_time = time.time() - started_at
        query_result, updated_query_ids = models.QueryResult.store_result(data_source.org_id, data_source,
                                                                              query_hash, query_text, data,
                                                                              run_time, utils.utcnow())

        models.db.session.commit()
        return query_result
    except Exception as e:
        if max_age > 0:
            abort(404, message="Unable to get result from the database, and no cached query result found.")
        else:
            abort(503, message="Unable to get result from the database.")
        return None

def run_query(data_source, parameter_values, query_text, query_id, max_age=0):
    query_parameters = set(collect_query_parameters(query_text))
    missing_params = set(query_parameters) - set(parameter_values.keys())
    if missing_params:
        return error_response('Missing parameter value for: {}'.format(", ".join(missing_params)))

    if data_source.paused:
        if data_source.pause_reason:
            message = '{} is paused ({}). Please try later.'.format(data_source.name, data_source.pause_reason)
        else:
            message = '{} is paused. Please try later.'.format(data_source.name)

        return error_response(message)

    if query_parameters:
        query_text = pystache.render(query_text, parameter_values)

    if max_age == 0:
        query_result = None
    else:
        query_result = models.QueryResult.get_latest(data_source, query_text, max_age)

    if query_result:
        return {'query_result': query_result.to_dict()}
    else:
        job = enqueue_query(query_text, data_source, None, metadata={"Username": "", "Query ID": query_id})
        logging.debug("run_query > job.to_dict() : %s", job.to_dict())
        return {'job': job.to_dict()}

@routes.route('/api/public/jobs/<job_id>', methods=['GET'])
def get_job(job_id):
    """
    Retrieve info about a running query job.
    """
    job = QueryTask(job_id=job_id)
    return json_response({'job': job.to_dict()})

@routes.route('/api/public/jobs/<job_id>', methods=['DELETE'])
def delete_job(job_id):
    """
    Cancel a query job in progress.
    """
    job = QueryTask(job_id=job_id)
    job.cancel()


@routes.route('/api/public/widgets/<widget_id>', methods=['GET'])
def public_widget(widget_id):
    logging.debug("/api/public/widgets/<widget_id> - WidgetResource/public_widget(id)")

    widget = get_object_or_404(models.Widget.get_by_id, widget_id)
    response = serialize_widget(widget)
    return json_response(response)