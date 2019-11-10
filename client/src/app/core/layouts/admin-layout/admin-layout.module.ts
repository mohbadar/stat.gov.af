import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavbarModule } from 'app/core/navbar/navbar.module';
import { FooterModule } from 'app/core/footer/footer.module';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { FixedPluginModule } from 'app/core/fixedplugin/fixedplugin.module';
import { PagesnavbarModule } from 'app/core/pagesnavbar/pagesnavbar.module';

import { AdminLayoutRoutes } from './admin-layout.routing';

@NgModule({
  declarations: [AdminLayoutComponent],
  imports: [RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NavbarModule,
    FooterModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    FixedPluginModule,
    PagesnavbarModule,
    CommonModule
  ],
  exports: [RouterModule]
})
export class AdminLayoutModule { }
