import { Routes } from '@angular/router';

import { AdminLayoutComponent, AuthLayoutComponent } from './core';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import {WidgetPageComponent } from './widget-page/widget-page.component';
// import { DashboardListComponent } from './dashboard/dashboard-list/dashboard-list.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        // loadChildren: './home/home.module#HomeModule'
      },
      // {
      //   path: 'documentation',
      //   loadChildren: './docs/docs.module#DocsModule'
      // }
      {
        path: 'dashboard/:slug',
        component: DashboardPageComponent
        // loadChildren: './dashboard-page/dashboard-page.module#DashboardPageModule'
      },
      {
        path: 'dashboards',
        // component: DashboardListComponent
        loadChildren: './dashboard-list/dashboard-list.module#DashboardListModule'
      },
    ]
  },
  {
    path: 'widget/:slug',
    component: WidgetPageComponent
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
