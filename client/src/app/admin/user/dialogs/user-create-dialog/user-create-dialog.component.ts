import { Component, OnInit, Inject, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { FormControl, Validators, FormGroupDirective, NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { User } from '../../../../models/user';



declare var $: any;

@Component({
	selector: 'user-create-dialog',
	templateUrl: './user-create-dialog.component.html',
	styleUrls: ['./user-create-dialog.component.scss']
})
export class UserCreateDialogComponent implements OnInit, AfterViewInit {
	@Output()
	toggleModal = new EventEmitter<Object>();
	@Input() data;

	isLoading = false;
	newUser: User;
	myForm: FormGroup;
	passwordMatch = true;

	constructor(
		public userService: UserService,
		private formBuilder: FormBuilder
	) {

		this.myForm = this.formBuilder.group({
			name: ['', [Validators.required]],
			username: ['', [Validators.required, Validators.minLength(3)]],
			address: ['', [Validators.required]],
			groups: [''],
			phone_no: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(13)]],
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required]],
			confirm_password: [''],
			active: false
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

		console.log('Form submitted', this.myForm.value);
		const vals = Array.from($('.selectpicker').find(':selected')).map((item) => {
			console.log('Id is: ', $(item).val());
			
			return Number($(item).val());
		});

		// const vals = $('.selectpicker').val();
		// console.log('new values------------------', vals);
		

		// Extract Groups by their IDs
		const groups = this.data.filter((item) => {
			console.log('item: ', item);
			if (vals.includes(item.id)) {
				return item;

			}
		});
		console.log('users groups are:', groups);

		console.log('Final group(s): ', groups);

		// Create new user object
		this.newUser = new User();
		this.newUser.name = this.myForm.get('name').value;
		this.newUser.username = this.myForm.get('username').value;
		this.newUser.email = this.myForm.get('email').value;
		this.newUser.address = this.myForm.get('address').value;
		this.newUser.phone_no = String(this.myForm.get('phone_no').value);
		this.newUser.active = this.myForm.get('active').value;
		this.newUser.password = this.myForm.get('password').value;
		this.newUser.confirm_password = this.myForm.get('confirm_password').value;

		this.newUser.groups = groups;

		console.log('here is the new user', JSON.stringify(this.newUser));

		this.createNewUser();
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

	createNewUser() {
		this.isLoading = true;
		this.userService.createUser(this.newUser).subscribe((response) => {
			console.log('server response: ', response);
			const msg = 'User successfully created';
			this.isLoading = false;
			this.myForm.reset({});
			this.toggleModal.emit({ 'modalType': 'create', show: false, newRecord: this.newUser });
			this.showNotification('top', 'center', msg, 'success', 'pe-7s-check');
		}, (err) => {
			const msg = 'There was an error creating user'
			this.showNotification('top', 'center', msg, 'danger', 'pe-7s-attention');
		});
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
