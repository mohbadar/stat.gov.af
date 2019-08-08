import { Routes } from '@angular/router';

import { AdminLayoutComponent, AuthLayoutComponent, DefaultLayoutComponent, DashboardComponent } from './core';

import { AppComponent } from './app.component';
import { WidgetPageComponent } from './widget-page/widget-page.component';
// import { DashboardListComponent } from './dashboard/dashboard-list/dashboard-list.component';

export const AppRoutes: Routes = [
	{
		path: '',
		component: AdminLayoutComponent,
		children: [
			{
				path: '',
				component: DashboardComponent,
			}, {
				path: 'dashboard/:slug',
				component: DashboardComponent
			}
			// , {
			// 	path: 'dashboards',
			// 	// component: DashboardListComponent
			// 	loadChildren: './dashboard-list/dashboard-list.module#DashboardListModule'
			// },
			]
	},
	{
		path: 'widgets/:slug',
		component: DefaultLayoutComponent,
		children: [
			{
				path: '',
				component: WidgetPageComponent,
				// loadChildren: './home/home.module#HomeModule'
			},
		]
	},
	{
		path: '',
		component: AuthLayoutComponent,
		children: [
			{
				path: 'error',
				loadChildren: './error/error.module#ErrorModule'
			}
		]
	},
	{
		path: '**',
		redirectTo: 'error/404'
	}
];
