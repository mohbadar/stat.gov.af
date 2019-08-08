from redash.query_runner import BaseHTTPQueryRunner, register


class Url(BaseHTTPQueryRunner):
    requires_url = False

    @classmethod
    def annotate_query(cls):
        return False

    def test_connection(self):
        pass

    def run_query(self, query, user):
        base_url = self.configuration.get("url", None)

        try:
            query = query.strip()

            if base_url is not None and base_url != "":
                if query.find("://") > -1:
                    return None, "Accepting only relative URLs to '%s'" % base_url

            if base_url is None:
                base_url = ""

            url = base_url + query

            response, error = self.get_response(url)
            if error is not None:
                return None, error

            json_data = response.content.strip()

            if json_data:
                return json_data, None
            else:
                return None, "Got empty response from '{}'.".format(url)
        except KeyboardInterrupt:
            return None, "Query cancelled by user."


register(Url)
