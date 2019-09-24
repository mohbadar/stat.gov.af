import { Routes } from '@angular/router';
import { WidgetPageComponent } from './widget-page.component';

export const WidgetPageRoutes: Routes = [
	{
		path: '',
		component: WidgetPageComponent,
		pathMatch:  'full'
	}
];
