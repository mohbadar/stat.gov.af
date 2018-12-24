import { Component, Input, OnInit, OnChanges, ViewChild, ElementRef, HostListener } from '@angular/core';
import { each, debounce, isArray, isObject, delay } from 'lodash';

import {
	ColorPalette,
	prepareData,
	prepareLayout,
	calculateMargins,
	updateDimensions,
	updateData,
	normalizeValue,
  } from '../utils';

@Component({
  selector: 'plotly-chart',
//   templateUrl: './plotly-chart.component.html',
//   styleUrls: ['./plotly-chart.component.scss']
	template: '<plotly-plot [data]="data" [config]="plotlyOptions" [layout]="layout" #plotlyChartContainer></plotly-plot>',
})
export class PlotlyChartComponent implements OnInit, OnChanges {
	@Input() options: any;
	@Input() series: any;
	
	@ViewChild('plotlyChartContainer') plotlyChartContainer: ElementRef;
	Plotly;
	plotlyElement;
	plotlyOptions = {};
	layout = {};
	data = [];
	redrawPendding = false;

  	constructor() { }

	ngOnChanges(changes) {

		if(changes.options) {
			// if (oldValue !== newValue) {
				// this.update();
			// }
		}
		if(changes.series) {
			// if (oldValue !== newValue) {
				// this.update();
			// }
		}
	}

	ngOnInit() {
		this.plotlyElement = this.plotlyChartContainer;
		this.Plotly = this.plotlyElement.plotly;
		// this.plotlyElement.updatePlot();
		this.plotlyElement = this.plotlyElement.plotEl.nativeElement;
		this.plotlyOptions = { modeBarButtonsToRemove: ['sendDataToCloud'], showLink: false, displaylogo: false };
		this.data = prepareData(this.series, this.options);
		updateData(this.data, this.options);
		this.layout = prepareLayout(this.plotlyElement, this.series, this.options, this.data);

		this.handleResize = debounce(this.updateChartDimensions, 250);
	}

	updateChartDimensions() {
		if (updateDimensions(this.layout, this.plotlyElement, calculateMargins(this.plotlyElement))) {
			this.Plotly.getPlotly().relayout(this.plotlyElement, this.layout);
			// this.Plotly.update(this.plotlyElement, this.layout);
		}
	}

	redraw() {
		this.Plotly.getPlotly().redraw(this.plotlyElement);
	}

	@HostListener('window:resize', ['$event'])
	onResize(event) {
		this.handleResize();		
	}

	handleResize() {
		// this.plotlyElement.afterPlot.emit();
	}

	update() { }

}