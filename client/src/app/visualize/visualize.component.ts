import { Component, Input, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import * as _ from 'lodash';
import { Globals } from './../core/_helpers';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';

declare var $: any;

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

	isLoading = true;

	@Input() columns: any = ["id", "name", "sex"];
	@Input() rows: any = [
		[1, "Ahmad", "Male"],
		[1, "Daud", "Male"],
		[1, "Sara", "Female"]
	];

	// plotlyConfig: any = Object.assign({}, DEFAULT_OPTIONS);
	plotlyConfig: any = { modeBarButtonsToRemove: ['sendDataToCloud'], showLink: false, displaylogo: false };
	layout: any = {
		autosize: true,
		xaxis: {
			showticklabels: true,
			autorange: '',
			type: 'linear'
		},
		yaxis: {
			showticklabels: true,
			autorange: '',
			type: 'linear'
		}
	};
	data: any = [];
	xAxisData: any = [];

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
		{id: "log", name: "Logarithmic"},
		{id: "category", name: "Category"}
	];
	colorTypes = [
		{id: "", name: "Automatic"},
		{id: "blue", name: "Blue"},
		{id: "red", name: "Red"},
		{id: "green", name: "Green"},
		{id: "purple", name: "Purple"},
		{id: "cyan", name: "Cyan"},
		{id: "orange", name: "Orange"},
		{id: "light blue", name: "Light Blue"},
		{id: "lilac", name: "Lilac"},
		{id: "light green", name: "Light Green"},
		{id: "brown", name: "Brown"},
		{id: "black", name: "Black"},
		{id: "gray", name: "Gray"},
		{id: "pink", name: "Pink"},
		{id: "dark blue", name: "Dark Blue"},
		{id: "indian red", name: "Indian Red"},
		{id: "green 2", name: "Green 2"},
		{id: "green 3", name: "Green 3"},
		{id: "dark violet", name: "Dark Violet"},
		{id: "pink 2", name: "Pink 2"},
		{id: "darkturquoise", name: "Darkturquoise"}
	];

	xColumnsList = [];
	yColumnsList = [];

	chartForm = this.fb.group({
		visualizationType: ['chart', Validators.required],
		visualizationName: [''],
		general: this.fb.group({
			chartType: ['bar'],
			xColumn: ['', Validators.required],
			yColumns: ['', Validators.required],
			groupBy: [''],
			showLegends: [false]
		}),
		xaxis: this.fb.group({
			scale: [''],
			name: [''],
			sortValue: [''],
			reverseOrder: [false],
			showLabels: [true]
		}),
		yaxis: this.fb.group({
			scale: [''],
			name: [''],
			minValue: [''],
			maxValue: [''],
			sortValue: [''],
			reverseOrder: [false]
		}),
		series: this.fb.array([])
	  });

	constructor(public translate: TranslateService,
		public globals: Globals,
		private fb: FormBuilder) {
	}

	get series() { return this.chartForm.get("series") as FormArray; }
	set series(seriesArray: FormArray) { this.chartForm.setControl("series", seriesArray); }

	get general() { return this.chartForm.get("general") }

	get yColumns() { return this.chartForm.get("general").get("yColumns") ; }

	ngOnInit() {
		this.plotlyElement = this.plotlyChartContainer;
		this.Plotly = this.plotlyElement.plotly;
		// this.plotlyElement.updatePlot();
		this.plotlyElement = this.plotlyElement.plotEl.nativeElement;

		// set columns to both x and y columns dorpdown
		this.xColumnsList = this.columns;
		this.yColumnsList = this.columns;

		// this.data.push(this.trace1);
		// this.data.push(this.trace2);
	}

	// preSetValues() {
	// 	this.chartForm.patchValue({
	// 		visualizationType: 'chart',
	// 		general: {
	// 			chartType: 'bar'
	// 		}
	// 	});
	// }

	ngAfterViewInit() {
		// setTimeout(()=> {
		// 	this.preSetValues();
		// });

		this.chartForm.valueChanges.subscribe((event) => {
			console.log(event);
			if (event.visualizationName != null && event.visualizationName != "") {
				this.layout.title = event.visualizationName;
			}

			// General
			if (event.general.chartType != null && event.general.chartType != "") {
				this.plotlyConfig.type = event.general.chartType;
				// also update the chart type for all series entries
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
			if (event.general.showLegends != null) {
				this.layout.showlegend = event.general.showLegends;
			}

			// x Axis
			if (event.xaxis.scale != null && event.xaxis.scale != "") {
				this.layout.xaxis.type = event.xaxis.scale;
			}
			if (event.xaxis.name != null && event.xaxis.name != "") {
				this.layout.xaxis.title = event.xaxis.name;
			}
			if (event.xaxis.showLabels != null) {
				this.layout.xaxis.showticklabels = event.xaxis.showLabels;
			}
			if (event.xaxis.reverseOrder != null) {
				if(event.xaxis.reverseOrder) {
					this.layout.xaxis.autorange = 'reversed';
				} else {
					this.layout.xaxis.autorange = '';
				}
			}

			// y Axis
			if (event.yaxis.scale != null && event.yaxis.scale != "") {
				this.layout.yaxis.type = event.yaxis.scale;
			}
			if (event.yaxis.name != null && event.yaxis.name != "") {
				this.layout.yaxis.title = event.yaxis.name;
			}
			if (event.yaxis.minValue != "" && event.yaxis.maxValue != "") {
				this.layout.yaxis.range[0] = Number(event.yaxis.minValue);
				this.layout.yaxis.range[1] = Number(event.yaxis.maxValue);
			}

			this.redraw();
		});

		// on change of chartType, all type of series entries must also change and set similar to chartTYpe value
		this.chartForm.get("general").get("chartType").valueChanges.subscribe((event) => {
			if (event != null && event != "") {
				this.series.controls.forEach(entry => {
					let seriesEntryTypeVal = entry.get("type").value;
					if(seriesEntryTypeVal != event)
						entry.get("type").setValue(event);
				});

				//also change the type for data array that feeded to plotly
				this.data.forEach(entry => {
					entry.type = event;
				})
			}
		});

		// on selection of Y columns, there should be same amount of rows in series tab
		this.chartForm.get("general").get("yColumns").valueChanges.subscribe((event) => {
			if (event != null && event != "") {
				this.addSeries(event);
			}
		});
		
	}

	// on change of x-axis column selection, 
	// 1. the given column should be removed from yColumns dropdown
	// 2. Also remove that column from chartForm if selected earlier
	onChangeXaxisColumn($event) {
		// fetch the data of selected column as array
		this.xAxisData = this.unpack(this.rows, this.columns.indexOf($event.currentTarget.value));
		for(let index = 0; index < this.data.length; index++) {
			const element = this.data[index];
			element.x = this.xAxisData;
		}

		this.yColumnsList = this.columns.filter(item => item !== $event.currentTarget.value);
		let yColumnsArray = this.chartForm.get("general").get("yColumns").value;
		if(yColumnsArray.length > 0) {
			this.chartForm.get("general").get("yColumns").setValue(yColumnsArray.filter(item => item !== $event.currentTarget.value));
			this.addSeries(this.yColumns.value);
		}
	}

	redraw() {
		this.Plotly.getPlotly().redraw(this.plotlyElement);
	}

	unpack(rows, key) {
		return rows.map(function(row) { return row[key]; });
	}

	addSeries(yColumns: any) {
		// add formGroup for each column in array of series
		if(yColumns != null) {
			let serieseFormArray: FormArray = this.fb.array([]);
			let newData = [];
			let index = 0;
			yColumns.forEach((item) => {
				serieseFormArray.push(
					this.fb.group({
						column: [item, Validators.required],
						label: [item, Validators.required],
						type: [this.general.get("chartType").value, [Validators.required]],
						color:''
						// color: ['blue', Validators.required]
					})
				);

				newData[index++] = {
					x: this.xAxisData,
					y: this.unpack(this.rows,  this.columns.indexOf(item)),
					name: item,
					type: this.general.get("chartType").value,
					// color:
				};
			});
			this.series = serieseFormArray;
			this.data = newData;
		}
	}

	onSeriesLabelChange(trace, $event) {
		trace.name = $event.currentTarget.value;
	}

	onSeriesTypeChange(trace, $event) {
		trace.type = $event.currentTarget.value;
	}

	onSeriesColorChange(trace, $event) {
		trace.marker = {
			color: $event.currentTarget.value
		};
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