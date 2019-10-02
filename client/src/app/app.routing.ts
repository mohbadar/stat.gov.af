import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './core/layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { PublicLayoutComponent, DefaultLayoutComponent } from './core/';
import { VisualizeComponent } from './visualize/visualize.component';
import { HomeComponent } from './home/home.component';
import { SelectLangComponent } from './selectlang/selectlang.component';
import { EditDashboardComponent } from './admin/node/mydashboard/edit-dashboard/edit-dashboard.component';


export const AppRoutes: Routes = [{
	path: '',
	redirectTo: 'home',
	pathMatch: 'full',
}, {
	path: '',
	component: PublicLayoutComponent,
	children: [
		{
		    path: 'lang',
		    component: SelectLangComponent
		},
		{
		    path: 'home',
		    component: HomeComponent
		},
		{
			path: 'dashboard', 
			loadChildren: './dashboard/dashboard.module#DashbaordModule'
			// component: DashboardComponent
		},
		{ 
			path: 'dashboard/:slug', 
			loadChildren: './dashboard/dashboard.module#DashbaordModule'
			// component: DashboardComponent
		},
		{ path: 'build-query', loadChildren: './query-builder/query-builder.module#QueryBuilderModule' },
		// { path: 'visualize', component: VisualizeComponent},
		{ path: '', redirectTo: 'home', pathMatch: 'full' },
	]
}
, {
	path: 'custom',
	component: PublicLayoutComponent,
	// canActivate: [AuthGuard],
	children: [
		{
			path: 'user-management', 
			loadChildren: './admin/node/user/user.module#UserModule'
			// component: DashboardComponent
		},


		{
			path: 'role-management', 
			loadChildren: './admin/node/role/role.module#RoleModule'
			// component: DashboardComponent
		},


		{
			path: 'my-dashboards', 
			loadChildren: './admin/node/mydashboard/mydashboard.module#MydashboardModule'
			// component: DashboardComponent
		},

		{
			path: 'my-dashboards/edit',
			// loadChildren: './admin/node/mydashboard/mydashboard.module#MydashboardModule', 
			component: EditDashboardComponent
		},

	]
},
{
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
