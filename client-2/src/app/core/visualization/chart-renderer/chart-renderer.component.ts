import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { QueryResult } from '../../../models/query-result';
import { Visualization } from '../../../models/visualization';
import {
  some, extend, defaults, has, partial, intersection, without, includes, isUndefined,
  sortBy, each, map, keys, difference,
} from 'lodash';

const DEFAULT_OPTIONS = {
  globalSeriesType: 'column',
  sortX: true,
  legend: { enabled: true },
  yAxis: [{ type: 'linear' }, { type: 'linear', opposite: true }],
  xAxis: { type: '-', labels: { enabled: true } },
  error_y: { type: 'data', visible: true },
  series: { stacking: null, error_y: { type: 'data', visible: true } },
  seriesOptions: {},
  valuesOptions: {},
  columnMapping: {},

  // showDataLabels: false, // depends on chart type
  numberFormat: '0,0[.]00000',
  percentFormat: '0[.]00%',
  // dateTimeFormat: 'DD/MM/YYYY HH:mm', // will be set from clientConfig
  textFormat: '', // default: combination of {{ @@yPercent }} ({{ @@y }} ± {{ @@yError }})

  defaultColumns: 3,
  defaultRows: 8,
  minColumns: 1,
  minRows: 5,
};

@Component({
  selector: 'chart-renderer',
  templateUrl: './chart-renderer.component.html',
  styleUrls: ['./chart-renderer.component.scss']
})

export class ChartRendererComponent implements OnInit, OnChanges {
	@Input('options') options: any;
	@Input('query-result') queryResult: QueryResult;
	chartSeries = [];
	plotlyOptions: any = Object.assign({}, DEFAULT_OPTIONS);;
	initialized = false;

	constructor() {	}

	ngOnChanges(changes) {
		if(this.initialized && changes.options) {
			this.reloadChart();
		}
		if(this.initialized && changes.queryResult) {
			this.reloadData();
		}
	}

  	ngOnInit() {
		this.initialized = true;
		this.chartSeries = [];
		this.reloadChart();

		// this.$watch('options', reloadChart, true);
		// this.$watch('queryResult && queryResult.getData()', reloadData);
	}

	zIndexCompare(series, options) {
		if (options.seriesOptions[series.name]) {
			return options.seriesOptions[series.name].zIndex;
		}
		return 0;
	}

	reloadChart() {
		this.reloadData();
		this.plotlyOptions = extend({
		showDataLabels: this.options.globalSeriesType === 'pie',
		dateTimeFormat: "DD/MM/YY HH:mm",
		}, DEFAULT_OPTIONS, this.options);
	}

	reloadData() {
		if (!isUndefined(this.queryResult) && this.queryResult.getData()) {
			const data = this.queryResult.getChartData(this.options.columnMapping);
			this.chartSeries = sortBy(data, (series) => { return this.zIndexCompare(series, this.options)});
		}
	}

	
}