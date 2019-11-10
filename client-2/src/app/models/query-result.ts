import moment from 'moment';
import { sortBy, uniq, values, some, each, isArray, isNumber, isString, includes } from 'lodash';
import { QueryService } from '../core/helpers/query.service';

const ALL_VALUES = '*';
const NONE_VALUES = '-';
const filterTypes = ['filter', 'multi-filter', 'multiFilter'];

function getColumnNameWithoutType(column) {
    let typeSplit;
    if (column.indexOf('::') !== -1) {
        typeSplit = '::';
    } else if (column.indexOf('__') !== -1) {
        typeSplit = '__';
    } else {
        return column;
    }

    const parts = column.split(typeSplit);
    if (parts[0] === '' && parts.length === 2) {
        return parts[1];
    }

    if (!includes(filterTypes, parts[1])) {
        return column;
    }

    return parts[0];
}

export function getColumnCleanName(column) {
    return getColumnNameWithoutType(column);
}

function getColumnFriendlyName(column) {
    return getColumnNameWithoutType(column).replace(/(?:^|\s)\S/g, a =>
    a.toUpperCase());
}

function addPointToSeries(point, seriesCollection, seriesName) {
    if (seriesCollection[seriesName] === undefined) {
        seriesCollection[seriesName] = {
            name: seriesName,
            type: 'column',
            data: [],
        };
    }

    seriesCollection[seriesName].data.push(point);
}

export class QueryResult {
    id;
    name;
    status = 'waiting';
    filters;
    filterFreeze;
    updatedAt;
    filteredData;
    columns;
    columnNames;
    QueryResultUrl = 'api/public/query_results/';
    JobUlr = 'api/public/jobs/';
    job: any = {};
    statuses = {
        1: 'waiting',
        2: 'processing',
        3: 'done',
        4: 'failed',
    };
    queryService: QueryService;

    // extended status flags
    isLoadingResult = false;
    latest_query_data_id;

    query_result;

    constructor(data) {
        this.job = {};
        this.status = 'waiting';
        this.filters = undefined;
        this.filterFreeze = undefined;

        this.updatedAt = moment();
        // extended status flags
        this.isLoadingResult = false;

        // Copy properties
        each(data, (v, k) => {
            this[k] = v;
        });

        
    }

    getStatus() {
        if (this.isLoadingResult) {
        return 'loading-result';
        }
        return this.status || this.statuses[this.job.status];
    }

    getError() {
        if (this.job.error === 'None') {
            return undefined;
        }
        return this.job.error;
    }

    isEmpty() {
        return this.getData() === null || this.getData().length === 0;
    }

    getById(id) {
        this.isLoadingResult = true;
        QueryService.getQueryResult(id).subscribe((data) => {
            // Success handler
            this.isLoadingResult = false;
            this.update(data);
          }, error => {
            console.log(error);
            // Error handler
            this.isLoadingResult = false;
          });

        return this;
    }

    update(props) {
        Object.assign(this, props);
  
        if ('query_result' in props) {
          this.status = 'done';
          this.filters = undefined;
          this.filterFreeze = undefined;

          const columnTypes = {};

          // TODO: we should stop manipulating incoming data, and switch to relaying
          // on the column type set by the backend. This logic is prone to errors,
          // and better be removed. Kept for now, for backward compatability.
          each(this.query_result.data.rows, (row) => {
            each(row, (v, k) => {
              let newType = null;
              if (isNumber(v)) {
                newType = 'float';
              } else if (isString(v) && v.match(/^\d{4}-\d{2}-\d{2}T/)) {
                row[k] = moment.utc(v);
                newType = 'datetime';
              } else if (isString(v) && v.match(/^\d{4}-\d{2}-\d{2}$/)) {
                row[k] = moment.utc(v);
                newType = 'date';
              } else if (typeof (v) === 'object' && v !== null) {
                row[k] = JSON.stringify(v);
              } else {
                newType = 'string';
              }

              if (newType !== null) {
                if (columnTypes[k] !== undefined && columnTypes[k] !== newType) {
                  columnTypes[k] = 'string';
                } else {
                  columnTypes[k] = newType;
                }
              }
            });
          });

          each(this.query_result.data.columns, (column) => {
            column.name = '' + column.name;
            if (columnTypes[column.name]) {
              if (column.type == null || column.type === 'string') {
                column.type = columnTypes[column.name];
              }
            }
          });

        //   this.deferred.resolve(this);
        } else if (this.job.status === 3) {
          this.status = 'processing';
        } else if (this.job.status === 4) {
        //   this.status = statuses[this.job.status];
        //   this.deferred.reject(new QueryResultError(this.job.error));
        } else {
          this.status = undefined;
        }
    }

    getRawData() {
        if (!this.query_result.data) {
            return null;
        }

        return this.query_result.data.rows;
    }

    getData() {
        if (!this.query_result || !this.query_result.data) {
            return null;
        }

        function filterValues(filters) {
            if (!filters) {
                return null;
            }

            return filters.reduce(
                (str, filter) =>
                str + filter.current
                , '',
            );
        }

        const filters = this.getFilters();
        const filterFreeze = filterValues(filters);

        if (this.filterFreeze !== filterFreeze) {
            this.filterFreeze = filterFreeze;

            if (filters) {
                filters.forEach((filter) => {
                    if (filter.multiple && includes(filter.current, ALL_VALUES)) {
                        filter.current = filter.values.slice(2);
                    }

                    if (filter.multiple && includes(filter.current, NONE_VALUES)) {
                        filter.current = [];
                    }
                });

                this.filteredData = this.query_result.data.rows.filter(row =>
                filters.reduce((memo, filter) => {
                    if (!isArray(filter.current)) {
                        filter.current = [filter.current];
                    }

                    return (memo && some(filter.current, (v) => {
                        const value = row[filter.name];
                        if (moment.isMoment(value)) {
                            return value.isSame(v);
                        }
                        // We compare with either the value or the String representation of the value,
                        // because Select2 casts true/false to "true"/"false".
                        return (v === value || String(value) === v);
                    }));
                }, true));
            } else {
                this.filteredData = this.query_result.data.rows;
            }
        }

        return this.filteredData;
    }

    getFilters() {
        if (!this.filters) {
            this.prepareFilters();
        }
        return this.filters;
    }

    getColumns() {
        if (this.columns === undefined && this.query_result.data) {
            this.columns = this.query_result.data.columns;
        }

        return this.columns;
    }

    getColumnNames() {
        if (this.columnNames === undefined && this.query_result.data) {
            this.columnNames = this.query_result.data.columns.map(v => v.name);
        }

        return this.columnNames;
    }

    getColumnCleanNames() {
        return this.getColumnNames().map(col => getColumnCleanName(col));
    }

    getColumnFriendlyNames() {
        return this.getColumnNames().map(col => getColumnFriendlyName(col));
    }

    prepareFilters() {
        if (!this.getColumns()) {
          return;
        }

        const filters = [];

        this.getColumns().forEach((col) => {
          const name = col.name;
          const type = name.split('::')[1] || name.split('__')[1];
          if (includes(filterTypes, type)) {
            // filter found
            const filter = {
              name,
              friendlyName: getColumnFriendlyName(name),
              column: col,
              values: [],
              multiple: (type === 'multiFilter') || (type === 'multi-filter'),
            };
            filters.push(filter);
          }
        }, this);

        this.getRawData().forEach((row) => {
          filters.forEach((filter) => {
            filter.values.push(row[filter.name]);
            if (filter.values.length === 1) {
              if (filter.multiple) {
                filter.current = [row[filter.name]];
              } else {
                filter.current = row[filter.name];
              }
            }
          });
        });

        filters.forEach((filter) => {
          if (filter.multiple) {
            filter.values.unshift(ALL_VALUES);
            filter.values.unshift(NONE_VALUES);
          }
        });

        // filters.forEach((filter) => {
        //   filter.values = uniq(filter.values, (v) => {
        //     if (moment.isMoment(v)) {
        //       return v.unix();
        //     }
        //     return v;
        //   });
        // });

        this.filters = filters;
      }

    getChartData(mapping) {
        const series = {};

        this.getData().forEach((row) => {
            let point:any = { $raw: row };
            let seriesName;
            let xValue = 0;
            const yValues = {};
            let eValue = null;
            let sizeValue = null;

            each(row, (v, definition) => {
                definition = '' + definition;
                const definitionParts = definition.split('::') || definition.split('__');
                const name = definitionParts[0];
                const type = mapping ? mapping[definition] : definitionParts[1];
                let value = v;

                if (type === 'unused') {
                    return;
                }

                if (type === 'x') {
                xValue = value;
                point[type] = value;
                }
                if (type === 'y') {
                    if (value == null) {
                        value = 0;
                    }
                    yValues[name] = value;
                    point[type] = value;
                }
                if (type === 'yError') {
                    eValue = value;
                    point[type] = value;
                }

                if (type === 'series') {
                    seriesName = String(value);
                }

                if (type === 'size') {
                    point[type] = value;
                    sizeValue = value;
                }

                if (type === 'multiFilter' || type === 'multi-filter') {
                    seriesName = String(value);
                }
            });

            if (seriesName === undefined) {
                each(yValues, (yValue, ySeriesName) => {
                    point = { x: xValue, y: yValue, $raw: point.$raw };
                    if (eValue !== null) {
                        point.yError = eValue;
                    }

                    if (sizeValue !== null) {
                        point.size = sizeValue;
                    }
                    addPointToSeries(point, series, ySeriesName);
                });
            } else {
                addPointToSeries(point, series, seriesName);
            }
        });
        return sortBy(values(series), 'name');
    }

    getName() {
        return this.name;
    }
    
    getLink(widgetId, queryId, fileType) {
        let link = `api/queries/${widgetId}/results/${queryId}.${fileType}`;
        return link;
    }
}
