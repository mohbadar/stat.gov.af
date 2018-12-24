import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  styles: [
    ':host ::ng-deep .mat-drawer-content {padding: 0; display: block!important;} .mat-drawer-container {z-index: 1000}'
  ],
  templateUrl: './auth-layout.component.html'
})
export class AuthLayoutComponent {}
