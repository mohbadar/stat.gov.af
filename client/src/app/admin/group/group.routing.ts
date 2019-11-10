import { Routes } from '@angular/router';

import { GroupComponent } from './group.component';

export const GroupRoutes: Routes = [
    {
        path: '',
        component: GroupComponent,
        pathMatch:  'full'
    }
];
