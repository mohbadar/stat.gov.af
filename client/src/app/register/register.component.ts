import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
	moduleId: module.id,
	selector: 'register-cmp',
	templateUrl: './register.component.html'
})

export class RegisterComponent implements OnInit {
	test: Date = new Date();
	registerForm: FormGroup;
	passwordMatch = true;

	constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {

	}

	checkFullPageBackgroundImage() {
		const $page = $('.full-page');
		const image_src = $page.data('image');

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

		this.initializeForm();
	}

	initializeForm() {
		this.registerForm = this.fb.group({
			fullName: ['', Validators.required],
			username: ['', Validators.required],
			mobileNumber: ['', Validators.required],
			email: ['', [Validators.required, Validators.email]],
			password: ['', Validators.required],
			passwordConf: ['', Validators.required]
		}, { validators: this.checkPasswords });

	}

	checkPasswords(group: FormGroup) { // here we have the 'passwords' group
		const pass = group.controls.password.value;
		const confirmPass = group.controls.passwordConf.value;

		return pass === confirmPass ? null : { notSame: true }
	}

	checkPassword(pass, confPass) {
		if (pass !== confPass) {
			this.passwordMatch = false;
		} else {
			this.passwordMatch = true;
		}
	}

	submit() {
		// TODO: validate form here
		console.log('Register Form: ', this.registerForm.value);
		// The passwordConf is not acceptable so create new json object to send
		const formJson = {
			'fullName': this.registerForm.get('fullName').value,
			'username': this.registerForm.get('username').value,
			'mobileNumber': this.registerForm.get('mobileNumber').value,
			'email': this.registerForm.get('email').value,
			'password': this.registerForm.get('password').value
		};
		this.authService.createUser(formJson).subscribe(res => {
			console.log('Response registration: ', res);
			this.router.navigate(['/login']);
		}, (err) =>
		{
			console.log("Registeration Failed");
		});
	}

	validateNumber(el) {
		const elValue = el.value;
		if (!(/^[0-9]*$/gm).test(elValue) || elValue.length > 10) {
			$(el).val(elValue.slice(0, elValue.length - 1));
		}
	}
}
