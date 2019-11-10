import { Routes } from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';
import { ErrorComponent } from './error/error.component';

export const ErrorRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '404',
        component: NotFoundComponent,
        data: {
          heading: '404',
          css: ''
        }
      },
      {
        path: 'error',
        component: ErrorComponent,
        data: {
          heading: 'Error',
          css: ''
        }
      }
    ]
  }
];
