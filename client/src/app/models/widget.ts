import * as moment from 'moment';
import { each, pick, extend, isObject, truncate } from 'lodash';
import { Query } from './query';
import { QueryResult } from './query-result';
import { QueryService } from '../core/helpers/query.service';
import { Visualization } from './visualization';
import { dashboardGridOptions } from './dashboard';

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
      const options = extend({}, visualization["defaultOptions"]);

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

export class Widget {
    // id: number;
    // name: string;
    id;
    width;
    options: any;
    data: any;
    visualization: Visualization;
    query;
    queryResult;
    text;
    refreshStartedAt;
    loading;
    queryService: QueryService;
    tags;
    $originalPosition;
    $dashboardComponent;
    $widgetContainer;
    isStandalone = false;
    $parsedText;

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

    getGridStackOptions() {
        return {
            x: this.$originalPosition.col,
            y: this.$originalPosition.row,
            width: this.$originalPosition.sizeX,
            height: this.$originalPosition.sizeY,
            w: this.$originalPosition.sizeX,
            h: this.$originalPosition.sizeY,
            verticalMargin: dashboardGridOptions.margins,
            // vertical_margin: dashboardGridOptions.margins,
            // real row height will be `cellHeight` + `verticalMargin`
            cellHeight: dashboardGridOptions.rowHeight - dashboardGridOptions.margins,
            // cell_height: dashboardGridOptions.rowHeight - dashboardGridOptions.margins,
            customid: this.id,
            minWidth: this.$originalPosition.minSizeX,
            canResize: true,
        };

    }

    getQueryResult(force = false) {
        if (!this.queryResult && this.visualization) {
            this.queryResult = new QueryResult(this.visualization.query);
        } else if (force) {
            this.queryResult = new QueryResult(this.visualization.query);
        }
        return this.queryResult;
    }

    getTags() {
        if (this.visualization) {
            this.tags = this.getQuery().tags;
        }
        return this.tags;
    }

    getQuery() {
        if (!this.query && this.visualization) {
            this.query = new Query(this.visualization.query);
        }
        return this.query;
    }

    getName() {
        if (this.visualization) {
          return `${this.visualization.query.name} (${this.visualization.name})`;
        }
        return truncate(this.text, {'length': 20});
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
}
