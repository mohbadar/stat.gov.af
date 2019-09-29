import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { RoleRoutes } from './role.routing';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';

import { RoleComponent } from './role.component';

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
  ]
})
export class RoleModule { }
