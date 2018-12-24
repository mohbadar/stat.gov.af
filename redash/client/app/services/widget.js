import moment from 'moment';
import { each, pick, extend, isObject, truncate } from 'lodash';

function calculatePositionOptions(Visualization, dashboardGridOptions, widget) {
  widget.width = 1; // Backward compatibility, user on back-end

  const visualizationOptions = {
    autoHeight: false,
    sizeX: Math.round(dashboardGridOptions.columns / 2),
    sizeY: dashboardGridOptions.defaultSizeY,
    minSizeX: dashboardGridOptions.minSizeX,
    maxSizeX: dashboardGridOptions.maxSizeX,
    minSizeY: dashboardGridOptions.minSizeY,
    maxSizeY: dashboardGridOptions.maxSizeY,
  };

  const visualization = widget.visualization ? Visualization.visualizations[widget.visualization.type] : null;
  if (isObject(visualization)) {
    const options = extend({}, visualization.defaultOptions);

    if (Object.prototype.hasOwnProperty.call(options, 'autoHeight')) {
      visualizationOptions.autoHeight = options.autoHeight;
    }

    // Width constraints
    const minColumns = parseInt(options.minColumns, 10);
    if (isFinite(minColumns) && minColumns >= 0) {
      visualizationOptions.minSizeX = minColumns;
    }
    const maxColumns = parseInt(options.maxColumns, 10);
    if (isFinite(maxColumns) && maxColumns >= 0) {
      visualizationOptions.maxSizeX = Math.min(maxColumns, dashboardGridOptions.columns);
    }

    // Height constraints
    // `minRows` is preferred, but it should be kept for backward compatibility
    const height = parseInt(options.height, 10);
    if (isFinite(height)) {
      visualizationOptions.minSizeY = Math.ceil(height / dashboardGridOptions.rowHeight);
    }
    const minRows = parseInt(options.minRows, 10);
    if (isFinite(minRows)) {
      visualizationOptions.minSizeY = minRows;
    }
    const maxRows = parseInt(options.maxRows, 10);
    if (isFinite(maxRows) && maxRows >= 0) {
      visualizationOptions.maxSizeY = maxRows;
    }

    // Default dimensions
    const defaultWidth = parseInt(options.defaultColumns, 10);
    if (isFinite(defaultWidth) && defaultWidth > 0) {
      visualizationOptions.sizeX = defaultWidth;
    }
    const defaultHeight = parseInt(options.defaultRows, 10);
    if (isFinite(defaultHeight) && defaultHeight > 0) {
      visualizationOptions.sizeY = defaultHeight;
    }
  }

  return visualizationOptions;
}

function WidgetFactory($http, Query, Visualization, dashboardGridOptions) {
  class Widget {
    constructor(data) {
      // Copy properties
      each(data, (v, k) => {
        this[k] = v;
      });

      const visualizationOptions = calculatePositionOptions(Visualization, dashboardGridOptions, this);

      this.options = this.options || {};
      this.options.position = extend(
        {},
        visualizationOptions,
        pick(this.options.position, ['col', 'row', 'sizeX', 'sizeY', 'autoHeight']),
      );

      if (this.options.position.sizeY < 0) {
        this.options.position.autoHeight = true;
      }

      // Save original position (create a shallow copy)
      this.$originalPosition = extend({}, this.options.position);
    }

    getQuery() {
      if (!this.query && this.visualization) {
        this.query = new Query(this.visualization.query);
      }

      return this.query;
    }

    getQueryResult() {
      return this.data;
    }

    getName() {
      if (this.visualization) {
        return `${this.visualization.query.name} (${this.visualization.name})`;
      }
      return truncate(this.text, 20);
    }

    load(force, maxAge) {
      if (!this.visualization) {
        return undefined;
      }

      // Both `this.data` and `this.queryResult` are query result objects;
      // `this.data` is last loaded query result;
      // `this.queryResult` is currently loading query result;
      // while widget is refreshing, `this.data` !== `this.queryResult`

      if (force || (this.queryResult === undefined)) {
        this.loading = true;
        this.refreshStartedAt = moment();

        if (maxAge === undefined || force) {
          maxAge = force ? 0 : undefined;
        }
        this.queryResult = this.getQuery().getQueryResult(maxAge);

        this.queryResult.toPromise()
          .then((result) => {
            this.loading = false;
            this.data = result;
          })
          .catch((error) => {
            this.loading = false;
            this.data = error;
          });
      }

      return this.queryResult.toPromise();
    }

    save() {
      const data = pick(this, 'options', 'text', 'id', 'width', 'dashboard_id', 'visualization_id');

      let url = 'api/widgets';
      if (this.id) {
        url = `${url}/${this.id}`;
      }

      return $http.post(url, data).then((response) => {
        each(response.data, (v, k) => {
          this[k] = v;
        });

        return this;
      });
    }

    delete() {
      const url = `api/widgets/${this.id}`;
      return $http.delete(url);
    }
  }

  return Widget;
}

export default function init(ngModule) {
  ngModule.factory('Widget', WidgetFactory);
}

init.init = true;

