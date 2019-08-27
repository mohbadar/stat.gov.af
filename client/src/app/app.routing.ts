import { Routes } from '@angular/router';

// import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { AdminLayoutComponent, DefaultLayoutComponent } from './core/';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WidgetPageComponent } from './widget-page/widget-page.component';


export const AppRoutes: Routes = [{
	path: '',
	redirectTo: 'dashboard',
	pathMatch: 'full',
}, {
	path: '',
	component: AdminLayoutComponent,
	children: [
		//     {
		//     path: '',
		//     loadChildren: './dashboard/dashboard.module#DashboardModule'
		// },
		{ path: 'dashboard', component: DashboardComponent },
		{ path: 'dashboard/:slug', component: DashboardComponent },
		{ path: '', redirectTo: 'dashboard', pathMatch: 'full' }]
}, {
	path: 'widgets/:slug',
	component: DefaultLayoutComponent,
	children: [
		{
			path: '',
			component: WidgetPageComponent,
			// loadChildren: './home/home.module#HomeModule'
		},
	]
}
// , {
// 	path: '',
// 	component: AuthLayoutComponent,
// 	children: [{
// 		path: 'pages',
// 		loadChildren: './pages/pages.module#PagesModule'
// 	}]
// }
];
