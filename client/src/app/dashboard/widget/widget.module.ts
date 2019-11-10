import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SafeHtmlPipe } from './../../_pipes/safe-html.pipe';
import { TranslateModule } from '@ngx-translate/core';

import { WidgetComponent } from './widget.component';
import { VisualizationModule } from 'app/visualization/visualization.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		TranslateModule,
		VisualizationModule
	],
	declarations: [
		SafeHtmlPipe,
		WidgetComponent,
	],
	exports: [
		WidgetComponent,
		SafeHtmlPipe,
	],
})
export class WidgetModule { }
