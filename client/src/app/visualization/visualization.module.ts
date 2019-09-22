import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
// google maps
import { AgmCoreModule } from '@agm/core';

import * as PlotlyJS from 'plotly.js/dist/plotly.js';
import { PlotlyModule } from 'angular-plotly.js';
PlotlyModule.plotlyjs = PlotlyJS;

import {
	VisualizationRendererComponent,
				
	BoxplotRendererComponent,
	ChartRendererComponent,
	ChoroplethRendererComponent,
	CohortRendererComponent,
	CounterRendererComponent,
	FunnelRendererComponent,
	MapRendererComponent,
	PivotTableRendererComponent,
	SankeyRendererComponent,
	SunburstSequenceRendererComponent,
	GridRendererComponent,
	WordCloudRendererComponent,

	DynamicTableComponent,
	DefaultCellComponent,
	JsonCellComponent,
	DynamicTableRowComponent,

	PlotlyChartComponent,
	CustomPlotlyChartComponent,
} from './';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		PlotlyModule,
		NgxDatatableModule,
		LeafletModule,
		AgmCoreModule,
	],
	declarations: [
		VisualizationRendererComponent,
				
		BoxplotRendererComponent,
		ChartRendererComponent,
		ChoroplethRendererComponent,
		CohortRendererComponent,
		CounterRendererComponent,
		FunnelRendererComponent,
		MapRendererComponent,
		PivotTableRendererComponent,
		SankeyRendererComponent,
		SunburstSequenceRendererComponent,
		GridRendererComponent,
		WordCloudRendererComponent,
	
		DynamicTableComponent,
		DefaultCellComponent,
		JsonCellComponent,
		DynamicTableRowComponent,
	
		PlotlyChartComponent,
		CustomPlotlyChartComponent,
	],
	exports: [
		VisualizationRendererComponent,
				
		BoxplotRendererComponent,
		ChartRendererComponent,
		ChoroplethRendererComponent,
		CohortRendererComponent,
		CounterRendererComponent,
		FunnelRendererComponent,
		MapRendererComponent,
		PivotTableRendererComponent,
		SankeyRendererComponent,
		SunburstSequenceRendererComponent,
		GridRendererComponent,
		WordCloudRendererComponent,
	
		DynamicTableComponent,
		DefaultCellComponent,
		JsonCellComponent,
		DynamicTableRowComponent,
	
		PlotlyChartComponent,
		CustomPlotlyChartComponent,
	],
})
export class VisualizationModule { }
