import { Routes } from '@angular/router';

import { MydashboardComponent } from './mydashboard.component';
import { EditDashboardComponent } from './dialogs/edit-dashboard/edit-dashboard.component';

export const MydashboardRoutes: Routes = [
	// {
	//     path: '/edit',
	//     component: EditDashboardComponent,
	// },
	{
		path: '',
		component: MydashboardComponent,
		pathMatch: 'full'
	},


];
