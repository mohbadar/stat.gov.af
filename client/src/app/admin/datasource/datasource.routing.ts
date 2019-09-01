import { Routes } from '@angular/router';

import { DatasourceComponent } from './datasource.component';

export const DatasourceRoutes: Routes = [
    {
        path: '',
        component: DatasourceComponent,
        pathMatch:  'full'
    }
];
