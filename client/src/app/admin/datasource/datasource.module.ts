
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { TranslateModule } from '@ngx-translate/core';

import { DatasourceRoutes } from './datasource.routing';
import { DatasourceComponent } from './datasource.component';

import { DatasourceCreateDialogComponent } from './dialogs/datasource-create-dialog/datasource-create-dialog.component';
import { DatasourceEditDialogComponent } from './dialogs/datasource-edit-dialog/datasource-edit-dialog.component';
import { DatasourceViewDialogComponent } from './dialogs/datasource-view-dialog/datasource-view-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    JwBootstrapSwitchNg2Module,
    ReactiveFormsModule,
    RouterModule.forChild(DatasourceRoutes),
  ],
  entryComponents: [
    DatasourceCreateDialogComponent,
    DatasourceEditDialogComponent,
    DatasourceViewDialogComponent
  ],
  declarations: [
    DatasourceComponent,
    DatasourceCreateDialogComponent,
    DatasourceEditDialogComponent,
    DatasourceViewDialogComponent
  ]
})
export class DatasourceModule { }
