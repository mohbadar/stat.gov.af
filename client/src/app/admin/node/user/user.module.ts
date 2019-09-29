import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { UserRoutes } from './user.routing';
import { TranslateModule } from '@ngx-translate/core';

import { UserComponent } from './user.component';

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
  ]
})
export class UserModule { }
