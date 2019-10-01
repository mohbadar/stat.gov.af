import { Routes } from '@angular/router';

import { MydashboardComponent} from './mydashboard.component';

export const MydashboardRoutes: Routes = [
    {
        path: '',
        component: MydashboardComponent,
        pathMatch:  'full'
    }
];
