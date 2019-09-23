import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './core/layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { PublicLayoutComponent, DefaultLayoutComponent } from './core/';
import { VisualizeComponent } from './visualize/visualize.component';
import { DashboardComponent } from './dashboard/dashboard.component';


export const AppRoutes: Routes = [{
	path: '',
	redirectTo: 'dashboard',
	pathMatch: 'full',
}, {
	path: '',
	component: PublicLayoutComponent,
	children: [
		//     {
		//     path: '',
		//     loadChildren: './dashboard/dashboard.module#DashboardModule'
		// },
		{
			path: 'dashboard', 
			// loadChildren: './dashboard/dashboard.module#DashbaordModule'
			component: DashboardComponent
		},
		{ 
			path: 'dashboard/:slug', 
			// loadChildren: './dashboard/dashboard.module#DashboardModule'
			component: DashboardComponent
		},
		{ path: 'build-query', loadChildren: './query-builder/query-builder.module#QueryBuilderModule' },
		{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
		{ path: 'visualize', component: VisualizeComponent} ]
}, {
	path: 'widgets/:slug',
	component: DefaultLayoutComponent,
	children: [
		{
			path: '',
			loadChildren: './widget-page/widget-page.module#WidgetPageModule'
			// component: WidgetPageComponent,
			// loadChildren: './home/home.module#HomeModule'
		},
	]
}, {
	path: 'more',
	loadChildren: './core/layouts/admin-layout/admin-layout.module#AdminLayoutModule',
	// canActivate:[AuthGuard],
}, {
	path: '',
	component: AuthLayoutComponent,
	children: [
		{
			path: 'login',
			loadChildren: './login/login.module#LoginModule',
			pathMatch: 'full',

		}, {
			path: 'signup',
			loadChildren: './register/register.module#RegisterModule',
			pathMatch: 'full'
		}

	]
},
	// , {
	// 	path: '',
	// 	component: AuthLayoutComponent,
	// 	children: [{
	// 		path: 'pages',
	// 		loadChildren: './pages/pages.module#PagesModule'
	// 	}]
	// }
];
