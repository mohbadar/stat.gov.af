import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { TranslateModule } from '@ngx-translate/core';

import { GroupRoutes } from './group.routing';
import { GroupComponent } from './group.component';
import { GroupCreateDialogComponent } from './dialogs/group-create-dialog/group-create-dialog.component';
import { GroupEditDialogComponent } from './dialogs/group-edit-dialog/group-edit-dialog.component';
import { GroupViewDialogComponent } from './dialogs/group-view-dialog/group-view-dialog.component';


@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    JwBootstrapSwitchNg2Module,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(GroupRoutes),
  ],
  entryComponents: [
    GroupCreateDialogComponent,
    GroupEditDialogComponent,
    GroupViewDialogComponent
  ],
  declarations: [
    GroupComponent,
    GroupCreateDialogComponent,
    GroupEditDialogComponent,
    GroupViewDialogComponent,
  ]
})
export class GroupModule { }
