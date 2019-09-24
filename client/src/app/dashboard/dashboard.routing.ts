import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { PublicLayoutComponent } from 'app/core';

export const DashboardRoutes: Routes = [
	{
		path: '',
		component: DashboardComponent,
		pathMatch:  'full'
	},
	{ 
		path: 'dashboard/:slug', 
		// loadChildren: './dashboard/dashboard.module#DashboardModule'
		component: DashboardComponent
	}
];
