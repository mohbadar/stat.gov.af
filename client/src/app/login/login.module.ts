import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginRoutes } from './login.routing';
import { LoginComponent } from './login.component';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(LoginRoutes),
		FormsModule,
		ReactiveFormsModule
	],
	declarations: [
		LoginComponent
	]
})
export class LoginModule { }
