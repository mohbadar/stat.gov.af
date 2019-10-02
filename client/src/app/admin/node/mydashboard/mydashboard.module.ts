import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { MydashboardRoutes } from './mydashboard.routing';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { MydashboardComponent } from './mydashboard.component';
import { CreateMydashboardComponent } from './dialogs/create-mydashboard/create-mydashboard.component';
import { EditDashboardComponent } from './edit-dashboard/edit-dashboard.component';
import { AddWidgetComponent } from './dialogs/add-widget/add-widget.component';




@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    JwBootstrapSwitchNg2Module,
    FormsModule,
    RouterModule.forChild(MydashboardRoutes),
  ],
  entryComponents: [
  ],
  declarations: [
    MydashboardComponent,
    CreateMydashboardComponent,
    // AddWidgetComponent,
  ]
})
export class MydashboardModule { }
