import _ from 'lodash';
import { Component, OnInit, Input, SimpleChanges, SimpleChange } from '@angular/core';
import { QueryResult, getColumnCleanName } from '../../models/query-result';
import { createFormatter } from '../../lib/value-format';
import { ClientConfigService } from '../../core/_helpers/client-config.service';

const ALLOWED_ITEM_PER_PAGE = [5, 10, 15, 20, 25];

const DISPLAY_AS_OPTIONS = [
{ name: 'Text', value: 'string' },
{ name: 'Number', value: 'number' },
{ name: 'Date/Time', value: 'datetime' },
{ name: 'Boolean', value: 'boolean' },
{ name: 'JSON', value: 'json' },
{ name: 'Image', value: 'image' },
{ name: 'Link', value: 'link' },
];

const DEFAULT_OPTIONS = {
itemsPerPage: 15,
autoHeight: true,
defaultRows: 14,
defaultColumns: 3,
minColumns: 2,
};

@Component({
  selector: 'grid-renderer',
  templateUrl: './grid-renderer.component.html',
  styleUrls: ['./grid-renderer.component.scss']
})
export class GridRendererComponent implements OnInit {
	@Input('options') options: any;
	@Input('query-result') queryResult: QueryResult;

	gridColumns;
	gridRows;
	filters;
	initialized = false;

	constructor() { }

	ngOnChanges(changes: SimpleChanges) {

		const options: SimpleChange = changes.options;
		if(!options.isFirstChange() && changes.options) {
			this.update();
		}
		const queryResult: SimpleChange = changes.queryResult;
		if(!queryResult.isFirstChange() && changes.queryResult) {
			this.update();
		}
	}

	ngOnInit() {
		this.gridColumns = [];
		this.gridRows = [];

		this.update();
	}

	update() {
		if (this.queryResult.getData() == null) {
			this.gridColumns = [];
			this.filters = [];
		} else {
			this.filters = this.queryResult.getFilters();
			this.gridRows = this.queryResult.getData();
			const columns = this.queryResult.getColumns();
			const columnsOptions = this.getColumnsOptions(columns, _.extend({}, this.options).columns);
			this.gridColumns = this.getColumnsToDisplay(columns, columnsOptions, ClientConfigService);
		}
	}

	getColumnContentAlignment(type) {
		return ['integer', 'float', 'boolean', 'date', 'datetime'].indexOf(type) >= 0 ? 'right' : 'left';
	}

	getDefaultColumnsOptions(columns) {
		const displayAs = {
			integer: 'number',
			float: 'number',
			boolean: 'boolean',
			date: 'datetime',
			datetime: 'datetime',
		};

		return _.map(columns, (col, index) => ({
			name: col.name,
			type: col.type,
			displayAs: displayAs[col.type] || 'string',
			visible: true,
			order: 100000 + index,
			title: getColumnCleanName(col.name),
			allowSearch: false,
			alignContent: this.getColumnContentAlignment(col.type),
			// `string` cell options
			allowHTML: true,
			highlightLinks: false,
		}));
	}

	getDefaultFormatOptions(column, clientConfig) {
		const dateTimeFormat = {
			date: clientConfig.dateFormat || 'DD/MM/YYYY',
			datetime: clientConfig.dateTimeFormat || 'DD/MM/YYYY HH:mm',
		};
		const numberFormat = {
			integer: clientConfig.integerFormat || '0,0',
			float: clientConfig.floatFormat || '0,0.00',
		};
		return {
			dateTimeFormat: dateTimeFormat[column.type],
			numberFormat: numberFormat[column.type],
			booleanValues: clientConfig.booleanValues || ['false', 'true'],
			// `image` cell options
			imageUrlTemplate: '{{ @ }}',
			imageTitleTemplate: '{{ @ }}',
			imageWidth: '',
			imageHeight: '',
			// `link` cell options
			linkUrlTemplate: '{{ @ }}',
			linkTextTemplate: '{{ @ }}',
			linkTitleTemplate: '{{ @ }}',
			linkOpenInNewTab: true,
		};
	}

	wereColumnsReordered(queryColumns, visualizationColumns) {
		queryColumns = _.map(queryColumns, col => col.name);
		visualizationColumns = _.map(visualizationColumns, col => col.name);

		// Some columns may be removed - so skip them (but keep original order)
		visualizationColumns = _.filter(visualizationColumns, col => _.includes(queryColumns, col));
		// Pick query columns that were previously saved with viz (but keep order too)
		queryColumns = _.filter(queryColumns, col => _.includes(visualizationColumns, col));

		// Both array now have the same size as they both contains only common columns
		// (in fact, it was an intersection, that kept order of items on both arrays).
		// Now check for equality item-by-item; if common columns are in the same order -
		// they were not reordered in editor
		for (let i = 0; i < queryColumns.length; i += 1) {
			if (visualizationColumns[i] !== queryColumns[i]) {
			return true;
			}
		}
		return false;
	}

	getColumnsOptions(columns, visualizationColumns) {
		const options = this.getDefaultColumnsOptions(columns);

		if ((this.wereColumnsReordered(columns, visualizationColumns))) {
			visualizationColumns = _.fromPairs(_.map(
			visualizationColumns,
			(col, index) => [col.name, _.extend({}, col, { order: index })],
			));
		} else {
			visualizationColumns = _.fromPairs(_.map(
			visualizationColumns,
			col => [col.name, _.omit(col, 'order')],
			));
		}

		_.each(options, col => _.extend(col, visualizationColumns[col.name]));

		return _.sortBy(options, 'order');
	}

	getColumnsToDisplay(columns, options, clientConfig) {
		columns = _.fromPairs(_.map(columns, col => [col.name, col]));
		let result = _.map(options, col => _.extend(
			this.getDefaultFormatOptions(col, clientConfig),
			col,
			columns[col.name],
		));

		result = _.map(result, col => _.extend(col, {
			formatFunction: createFormatter(col),
		}));

		return _.sortBy(_.filter(result, 'visible'), 'order');
	}

}
