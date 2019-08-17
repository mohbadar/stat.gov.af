import { Routes } from '@angular/router';

// import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { AdminLayoutComponent, DashboardComponent, DefaultLayoutComponent } from './core';
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
		{
			path: 'components',
			loadChildren: './components/components.module#ComponentsModule'
		}, {
			path: 'forms',
			loadChildren: './forms/forms.module#Forms'
		}, {
			path: 'tables',
			loadChildren: './tables/tables.module#TablesModule'
		}, {
			path: 'maps',
			loadChildren: './maps/maps.module#MapsModule'
		}, {
			path: 'charts',
			loadChildren: './charts/charts.module#ChartsModule'
		}, {
			path: 'calendar',
			loadChildren: './calendar/calendar.module#CalendarModule'
		}, {
			path: 'user',
			loadChildren: './userpage/user.module#UserModule'
		},
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
}, {
	path: '',
	component: AuthLayoutComponent,
	children: [{
		path: 'pages',
		loadChildren: './pages/pages.module#PagesModule'
	}]
}
];
