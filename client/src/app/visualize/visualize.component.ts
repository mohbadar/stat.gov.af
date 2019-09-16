import { Component, Input, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import * as _ from 'lodash';
import { Globals } from './../core/_helpers';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

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
	@ViewChild('plotlyChartContainer', { static: true }) plotlyChartContainer: ElementRef;
	Plotly;
	plotlyElement;

	@Input() columns: any = ["id", "name", "sex"];
	@Input() rows: any = [
		[1, "Ahmad", "M"],
		[1, "Daud", "M"],
		[1, "Sara", "F"]
	];

	

	trace1 = {
		x: [0, 1, 2, 3, 4, 5, 6, 7, 8],
		y: [8, 7, 6, 5, 4, 3, 2, 1, 0],
		type: 'scatter'
	  };
	trace2 = {
		x: [0, 1, 2, 3, 4, 5, 6, 7, 8],
		y: [0, 1, 2, 3, 4, 5, 6, 7, 8],
		type: 'scatter'
	  };

	// plotlyConfig: any = Object.assign({}, DEFAULT_OPTIONS);
	plotlyConfig: any = { modeBarButtonsToRemove: ['sendDataToCloud'], showLink: false, displaylogo: false };
	layout: any = {
		autosize: true,
		xaxis: {},
		yaxis: {}
	};
	data: any = [];

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

	chartForm = this.fb.group({
		visualizationType: ['', Validators.required],
		visualizationName: [''],
		general: this.fb.group({
			chartType: [''],
			xColumn: [''],
			yColumns: [''],
			groupBy: [''],
			showLegends: ['']
		}),
		xaxis: this.fb.group({
			scale: [''],
			name: [''],
			sortValue: [''],
			reverseOrder: [''],
			showLabels: ['']
		}),
		yaxis: this.fb.group({
			scale: [''],
			name: [''],
			minValue: [''],
			maxValue: [''],
			sortValue: [''],
			reverseOrder: ['']
		}),
		series: this.fb.group({
		}),
		colors: this.fb.group({
		})
	  });

	constructor(public translate: TranslateService,
		public globals: Globals,
		private fb: FormBuilder) {
	}

	ngOnInit() {
		this.plotlyElement = this.plotlyChartContainer;
		this.Plotly = this.plotlyElement.plotly;
		// this.plotlyElement.updatePlot();
		this.plotlyElement = this.plotlyElement.plotEl.nativeElement;

		this.data.push(this.trace1);
		this.data.push(this.trace2);
	}

	ngAfterViewInit() {
		

		this.chartForm.valueChanges.subscribe((event) => {
			console.log(event);
			if (event.visualizationName != null && event.visualizationName != "") {
				this.layout.title = event.visualizationName;
			}

			// General
			if (event.general.chartType != null && event.general.chartType != "") {
				this.plotlyConfig.type = event.general.chartType;
			}
			if (event.general.xColumn != null && event.general.xColumn != "") {
				this.plotlyConfig.title = event.general.xColumn;
			}
			if (event.general.yColumns != null && event.general.yColumns != "") {
				this.plotlyConfig.title = event.general.yColumns;
			}
			if (event.general.groupBy != null && event.general.groupBy != "") {
				this.plotlyConfig.title = event.general.groupBy;
			}
			if (event.general.showLegends != null && event.general.showLegends != "") {
				this.layout.showlegend = event.general.showLegends;
			}

			// x Axis
			if (event.xaxis.name != null && event.xaxis.name != "") {
				this.layout.xaxis.title = event.xaxis.name;
			}

			// y Axis
			if (event.yaxis.name != null && event.yaxis.name != "") {
				this.layout.yaxis.title = event.yaxis.name;
			}
			if (event.yaxis.minValue != "" && event.yaxis.maxValue != "") {
				this.layout.yaxis.range[0] = Number(event.yaxis.minValue);
				this.layout.yaxis.range[1] = Number(event.yaxis.maxValue);
			}

			this.redraw();
		});
		
	}

	redraw() {
		this.Plotly.getPlotly().redraw(this.plotlyElement);
	}

	unpack(rows, key) {
		return rows.map(function(row) { return row[key]; });
	}

	getValue() {
		return JSON.stringify(this.chartForm.value, null, 4)
	}

	getPlotlyConfig() {
		return JSON.stringify(this.plotlyConfig, null, 4)
	}

	getLayout() {
		return JSON.stringify(this.layout, null, 4)
	}

	getData() {
		return JSON.stringify(this.data, null, 4)
	}
}