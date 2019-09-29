import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { RoleRoutes } from './role.routing';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';

import { RoleComponent } from './role.component';
import { CreateRoleComponent } from './dialogs/create-role/create-role.component';
import { EditRoleComponent } from './dialogs/edit-role/edit-role.component';
import { ViewRoleComponent } from './dialogs/view-role/view-role.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    JwBootstrapSwitchNg2Module,
    FormsModule,
    RouterModule.forChild(RoleRoutes),
  ],
  entryComponents: [
  ],
  declarations: [
    RoleComponent,
    CreateRoleComponent,
    EditRoleComponent,
    ViewRoleComponent,
  ]
})
export class RoleModule { }
