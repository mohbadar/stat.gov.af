import { Component, Input, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import * as _ from 'lodash';
import { Globals } from './../core/_helpers';
import { TranslateService } from '@ngx-translate/core';

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
	selector: 'visualize',
	templateUrl: './visualize.component.html',
	styleUrls: ['./visualize.component.scss']
})
export class VisualizeComponent implements OnInit {
	@Input() columns: any = ["id", "name", "sex"];
	@Input() rows: any = [
		[1, "Ahmad", "M"],
		[1, "Daud", "M"],
		[1, "Sara", "F"]
	];

	plotlyOptions: any = Object.assign({}, DEFAULT_OPTIONS);

	visualizationTypes = [
		{id: "chart", name: "CHART"}
	];
	chartTypes = [
		{id: "line", name: "LINE"},
		{id: "bar", name: "BAR"},
		{id: "area", name: "AREA"},
		{id: "pie", name: "PIE"},
		{id: "scatter", name: "SCATTER"},
		{id: "bubble", name: "BUBBLE"},
		{id: "heatmap", name: "HEATMAP"},
		{id: "box", name: "BOX"}
	];
	scaleTypes = [
		{id: "auto_detect", name: "Auto Detect"},
		{id: "datetime", name: "Datetime"},
		{id: "linear", name: "Linear"},
		{id: "logarithmic", name: "Logarithmic"},
		{id: "category", name: "Category"}
	];

	constructor(public translate: TranslateService,
		public globals: Globals) {
	}

	ngOnInit() {
		
	}

	ngAfterViewInit() {
		
	}

}