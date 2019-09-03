import { Routes } from '@angular/router';
import { QueryBuilderComponent } from './query-builder.component';

export const QueryBuilderRoutes: Routes = [
	{
		path: '',
		component: QueryBuilderComponent,
		pathMatch:  'full'
	}
];
