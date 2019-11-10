import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WidgetPageRoutes } from './widget-page.routing';
import { WidgetPageComponent } from './widget-page.component';
import { WidgetModule } from './../dashboard/widget/widget.module';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(WidgetPageRoutes),
		FormsModule,
		ReactiveFormsModule,
		WidgetModule
	],
	declarations: [
		WidgetPageComponent
	]
})
export class WidgetPageModule { }
