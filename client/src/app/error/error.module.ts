import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';

import { ErrorRoutes } from './error.routing';
import { NotFoundComponent } from './not-found/not-found.component';
import { ErrorComponent } from './error/error.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ErrorRoutes),
    FlexLayoutModule
  ],
  declarations: [NotFoundComponent, ErrorComponent]
})
export class ErrorModule {}
