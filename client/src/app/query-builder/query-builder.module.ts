import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QueryBuilderRoutes } from './query-builder.routing';
import { QueryBuilderComponent } from './query-builder.component';
import { Select2Module } from 'ng2-select2';
import { VisualizeModule } from 'app/visualize/visualize.module';

import * as PlotlyJS from 'plotly.js/dist/plotly.js';
import { PlotlyModule } from 'angular-plotly.js';
PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(QueryBuilderRoutes),
		FormsModule,
		ReactiveFormsModule,
		Select2Module,
		VisualizeModule,
		PlotlyModule
	],
	declarations: [
		QueryBuilderComponent,
	]
})
export class QueryBuilderModule { }
