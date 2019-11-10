import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { UserRoutes } from './user.routing';
import { TranslateModule } from '@ngx-translate/core';

import { UserComponent } from './user.component';
import { UserCreateDialogComponent } from './dialogs/user-create-dialog/user-create-dialog.component';
import { UserEditDialogComponent } from './dialogs/user-edit-dialog/user-edit-dialog.component';
import { UserViewDialogComponent } from './dialogs/user-view-dialog/user-view-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    JwBootstrapSwitchNg2Module,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(UserRoutes)
  ],
  entryComponents: [
    UserCreateDialogComponent,
    UserEditDialogComponent,
    UserViewDialogComponent
  ],
  declarations: [
    UserComponent,
    UserCreateDialogComponent,
    UserEditDialogComponent,
    UserViewDialogComponent,
  ]
})
export class UserModule { }
