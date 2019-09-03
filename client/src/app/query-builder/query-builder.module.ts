import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QueryBuilderRoutes } from './query-builder.routing';
import { QueryBuilderComponent } from './query-builder.component';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(QueryBuilderRoutes),
		FormsModule,
		ReactiveFormsModule
	],
	declarations: [
		QueryBuilderComponent
	]
})
export class QueryBuilderModule { }
