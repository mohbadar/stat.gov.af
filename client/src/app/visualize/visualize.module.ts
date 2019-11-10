import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VisualizeComponent } from 'app/visualize/visualize.component';

import { PlotlyModule } from 'angular-plotly.js';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		PlotlyModule,
		TranslateModule
	],
	declarations: [
		VisualizeComponent
	],
	exports: [
		VisualizeComponent
	]
})
export class VisualizeModule { }
