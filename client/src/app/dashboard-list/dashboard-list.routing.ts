import { Routes } from '@angular/router';

import { DashboardListComponent } from './dashboard-list.component';

export const DashboardRoutes: Routes = [
  // {
  //   path: '',
  //   component: DashboardComponent,
  //   data: {
  //     heading: 'Dashboard',
  //     css: ''
  //   }
  // }
  {
    path: '',
    component: DashboardListComponent
  }
];
