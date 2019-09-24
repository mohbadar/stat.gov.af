import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { GridStackModule } from 'ng4-gridstack';
import { WidgetModule } from './widget/widget.module';
import { RouterModule } from '@angular/router';
import { DashboardRoutes } from './dashboard.routing';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		RouterModule.forChild(DashboardRoutes),
		GridStackModule,
		ReactiveFormsModule,
		
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
