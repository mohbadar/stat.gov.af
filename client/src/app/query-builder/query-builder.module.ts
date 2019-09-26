import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QueryBuilderRoutes } from './query-builder.routing';
import { QueryBuilderComponent } from './query-builder.component';
import { Select2Module } from 'ng2-select2';
import { VisualizeModule } from 'app/visualize/visualize.module';
@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(QueryBuilderRoutes),
		FormsModule,
		ReactiveFormsModule,
		Select2Module,
		VisualizeModule
	],
	declarations: [
		QueryBuilderComponent,
	]
})
export class QueryBuilderModule { }
