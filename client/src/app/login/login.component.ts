import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../models/user';

declare var $: any;

@Component({
	moduleId: module.id,
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	providers: []
})
export class LoginComponent implements OnInit {
	currentDate: Date = new Date();
	myForm: FormGroup;
	isLoading = false;
	newRecord;

	constructor(public authService: AuthService, private formBuilder: FormBuilder, private router: Router) {
		this.myForm = this.formBuilder.group({
			username: ['', [Validators.required]],
			password: ['', [Validators.required]]
		});
	}

	submit() {
		// Create new object
		this.newRecord = {
			'username': this.myForm.get('username').value,
			'password': this.myForm.get('password').value
		}
		this.isLoading = true;
		this.authService.login(this.newRecord).subscribe((response: any) => {
			console.log('server response: ', response);
			const msg = 'Successfully Logged in';

			const token = response.token;
			this.isLoading = false;
			this.myForm.reset({});
			this.showNotification('top', 'center', msg, 'success', 'pe-7s-check');

			this.authService.saveToken(token);
			this.router.navigate(['/dashboard']);
		}, (err) => {
			console.log('error: ', err);
			const msg = 'Failed to Login. Please enter correct username and password'
			this.showNotification('top', 'center', msg, 'danger', 'pe-7s-attention');
			this.isLoading = false;
		});
	}

	checkFullPageBackgroundImage() {
		var $page = $('.full-page');
		var image_src = $page.data('image');

		if (image_src !== undefined) {
			var image_container = '<div class="full-page-background" style="background-image: url(' + image_src + ') "/>'
			$page.append(image_container);
		}
	};

	ngOnInit() {
		this.checkFullPageBackgroundImage();

		setTimeout(function () {
			// after 1000 ms we add the class animated to the login/register card
			$('.card').removeClass('card-hidden');
		}, 700)
	}

	showNotification(from, align, msg, type, icon) {
		// $.notify({
		// 	icon: icon,
		// 	message: msg

		// }, {
		// 		type: type,
		// 		timer: 2000,
		// 		placement: {
		// 			from: from,
		// 			align: align
		// 		}
		// 	});
	}

}
