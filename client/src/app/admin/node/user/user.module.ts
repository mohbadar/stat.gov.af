import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { UserRoutes } from './user.routing';
import { TranslateModule } from '@ngx-translate/core';

import { UserComponent } from './user.component';
import { CreateUserComponent } from './dialog/create-user/create-user.component';
import { ViewUserComponent } from './dialog/view-user/view-user.component';
import { EditUserComponent } from './dialog/edit-user/edit-user.component';

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

  ],
  declarations: [
    UserComponent,
    CreateUserComponent,
    ViewUserComponent,
    EditUserComponent,
  ]
})
export class UserModule { }
