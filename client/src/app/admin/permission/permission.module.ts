import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { PermissionRoutes } from './permission.routing';

import { PermissionComponent } from './permission.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    RouterModule.forChild(PermissionRoutes),
  ],
  declarations: [
    PermissionComponent
  ]
})
export class PermissionModule { }
