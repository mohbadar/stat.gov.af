import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout.component';

export const AdminLayoutRoutes: Routes = [{
    path: '',
    component: AdminLayoutComponent,
    children: [
        // {
        //     path: 'dashboard',
        //     loadChildren: './../../../dashboard/dashboard.module#DashboardModule',
        //     // canLoad: [AuthGuard]
		// }, 
		{
            path: 'admin/users',
            loadChildren: './../../../admin/user/user.module#UserModule'
        }, {
            path: 'admin/datasource',
            loadChildren: './../../../admin/datasource/datasource.module#DatasourceModule'
        }, {
            path: 'admin/roles',
            loadChildren: './../../../admin/role/role.module#RoleModule'
        }, {
            path: 'admin/groups',
            loadChildren: './../../../admin/group/group.module#GroupModule'
        }, {
            path: 'admin/permissions',
            loadChildren: './../../../admin/permission/permission.module#PermissionModule'
		},
		//  {
        //     path: 'profile',
        //     loadChildren: './../../../profile/profile.module#ProfileModule'
        // }
    ]
}];
