import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { DashboardListComponent } from './dashboard-list.component';
import { DashboardRoutes } from './dashboard-list.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DashboardRoutes),
  ],
  declarations: [DashboardListComponent]
})
export class DashboardListModule {
  constructor() {
  }
}
