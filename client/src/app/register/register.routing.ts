import { Routes } from '@angular/router';
import { RegisterComponent } from './register.component';

export const RegisterRoutes: Routes = [
	{
		path: '',
		component: RegisterComponent,
		pathMatch:  'full'
	}
];
