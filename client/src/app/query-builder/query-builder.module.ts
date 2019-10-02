import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QueryBuilderRoutes } from './query-builder.routing';
import { QueryBuilderComponent } from './query-builder.component';
import { VisualizeModule } from 'app/visualize/visualize.module';
import { TranslateModule } from '@ngx-translate/core';
import * as PlotlyJS from 'plotly.js/dist/plotly.js';
import { PlotlyModule } from 'angular-plotly.js';
PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(QueryBuilderRoutes),
		FormsModule,
		ReactiveFormsModule,
		VisualizeModule,
		PlotlyModule,
		TranslateModule
	],
	declarations: [
		QueryBuilderComponent,
	]
})
export class QueryBuilderModule { }
