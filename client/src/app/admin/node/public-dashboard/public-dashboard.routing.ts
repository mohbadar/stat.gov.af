import { Routes } from '@angular/router';

import { PublicDashboardComponent } from './public-dashboard.component';

export const PublicDashboardRoutes: Routes = [
	// {
	//     path: '/edit',
	//     component: EditDashboardComponent,
	// },
	{
		path: '',
		component: PublicDashboardComponent,
		pathMatch: 'full'
	},


];
