import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { GridStackModule } from 'ng4-gridstack';
import { WidgetModule } from './widget/widget.module';
import { RouterModule } from '@angular/router';
import { DashboardRoutes } from './dashboard.routing';

import * as PlotlyJS from 'plotly.js/dist/plotly.js';
import { PlotlyModule } from 'angular-plotly.js';
PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		RouterModule.forChild(DashboardRoutes),
		GridStackModule,
		ReactiveFormsModule,
		PlotlyModule,
		WidgetModule
	],
	declarations: [
		DashboardComponent
	],
	exports: [
		DashboardComponent
	],
})
export class DashbaordModule { }
