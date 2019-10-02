import { Component, OnInit, Inject, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormGroupDirective, NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { User } from '../../../../../models/user';
import { UserService } from 'app/services/node/user.service';
import { AuthService } from 'app/services/auth.service';



declare var $: any;

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements  OnInit, AfterViewInit {
	@Output()
	toggleModal = new EventEmitter<Object>();
	@Input() data;

	isLoading = false;
	newUser: User;
	myForm: FormGroup;
  passwordMatch = true;

	constructor(
		public userService: UserService,
		private formBuilder: FormBuilder,
		private authService: AuthService
	) {

		this.myForm = this.formBuilder.group({
			fullName: ['', [Validators.required]],
			username: ['', [Validators.required, Validators.minLength(3)]],
			roles: [''],
			mobileNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(13)]],
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required]],
			confirm_password: [''],
		}, { validator: this.checkPasswords });
	}

	checkPasswords(group: FormGroup) { // here we have the 'passwords' group
		const pass = group.controls.password.value;
		const confirmPass = group.controls.confirm_password.value;

		return pass === confirmPass ? null : { notSame: true }
	}

	ngOnInit() {
		console.log('USER : ', this.data);
	}

	ngAfterViewInit() {
		if ($('.selectpicker').length !== 0) {
			$('.selectpicker').selectpicker({
				iconBase: 'fa',
				tickIcon: 'fa-check'
			});
		}
	}


	submit() {
		const vals = Array.from($('.selectpicker').find(':selected')).map((item) => {
			return String($(item).val());
		});
		// Extract permissions by their IDs
		const roles = this.data.filter((item) => {
			if (vals.indexOf(item._id) != -1) {
				return item;
			}
		});

		console.log('users roles are:', roles);

		const formJson = {
			'fullName': this.myForm.get('fullName').value,
			'username': this.myForm.get('username').value,
			'mobileNumber': this.myForm.get('mobileNumber').value,
			'email': this.myForm.get('email').value,
			'password': this.myForm.get('password').value,
			'roles': JSON.stringify(roles)
		};

		console.log('here is the new user', formJson);

		// this.userService.create(formJson).subscribe(res => {
		// 	console.log('Response registration: ', res);
		// })

		this.isLoading = true;
		this.userService.create(formJson).subscribe((response) => {
			console.log('server response: ', response);
			const msg = 'User successfully created';
			this.isLoading = false;
			this.myForm.reset({});
			this.toggleModal.emit({ 'modalType': 'create', show: false, newRecord: this.newUser });
			// this.showNotification('top', 'center', msg, 'success', 'pe-7s-check');
		}, (err) => {
			const msg = 'There was an error creating user'
			// this.showNotification('top', 'center', msg, 'danger', 'pe-7s-attention');
		});



		// this.createNewUser();
	}

	checkPassword(pass, confPass) {
		if (pass !== confPass) {
			this.passwordMatch = false;
		} else {
			this.passwordMatch = true;
		}
	}

	onNoClick(): void {
		// this.dialogRef.close();
	}

	stopEdit(): void {
		// this.userService.updateUser(this.data);
	}

	cancelRegistration() {
		if (this.myForm.dirty) {
			const conf = confirm('Are you sure you want to cancel?');
			if (conf) {
				this.myForm.reset({});
				$('.selectpicker').val('default');
				$('.selectpicker').selectpicker('refresh');
				this.toggleModal.emit({ 'modalType': 'create', show: false });
			}
		} else {
			$('.selectpicker').val('default');
			$('.selectpicker').selectpicker('refresh');
			this.toggleModal.emit({ 'modalType': 'create', show: false });
		}
	}

	showNotification(from, align, msg, type, icon) {
		$.notify({
			icon: icon,
			message: msg

		}, {
				type: type,
				timer: 4000,
				placement: {
					from: from,
					align: align
				}
			});
	}
}
