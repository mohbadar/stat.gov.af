import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { User } from '../../../../models/user';
declare var $: any;


@Component({
	selector: 'user-edit-dialog',
	templateUrl: './user-edit-dialog.component.html',
	styleUrls: ['./user-edit-dialog.component.scss']
})
export class UserEditDialogComponent implements OnInit, AfterViewInit, OnDestroy {
	@Output()
	toggleModal = new EventEmitter<Object>();

	isLoading = false;
	newUser: User;
	editForm: FormGroup;
	@Input() data;

	formControl = new FormControl('', [
		Validators.required
	]);

	constructor(public userService: UserService, private formBuilder: FormBuilder) { }

	compareFn(c1, c2): boolean {
		return c1 && c2 ? c1.id === c2.id : c1 === c2;
	}

	ngOnInit() {
		console.log('Dialog: ', this.data);
		this.editForm = this.formBuilder.group({
			name: [this.data.user.name, [Validators.required]],
			username: [this.data.user.username, [Validators.required, Validators.minLength(3)]],
			address: [this.data.user.address, [Validators.required]],
			phone_no: [this.data.user.phoneNo, [Validators.required, Validators.minLength(10), Validators.maxLength(13)]],
			email: [this.data.user.email, [Validators.required, Validators.email]],
			active: this.data.user.active
		});
	}

	checkPasswords(group: FormGroup) { // here we have the 'passwords' group
		const pass = group.controls.password.value;
		const confirmPass = group.controls.confirm_password.value;
		return pass === confirmPass ? null : { notSame: true }
	}

	ngOnDestroy() {
		// this.toggleModal.unsubscribe();
	}

	ngAfterViewInit() {
		console.log('Method called');
		const vals = [];
		this.data.groups.forEach(el => {
			vals.push(el.id);
		});
		//  Init Bootstrap Select Picker
		if ($('.selectpicker').length !== 0) {
			$('.selectpicker').selectpicker({
				iconBase: 'fa',
				tickIcon: 'fa-check'
			});
			$('.selectpicker').selectpicker('val', vals);
		}

		console.log('data groups: ', this.data.groups);
		console.log('data: ', vals);
	}

	getErrorMessage() {
		return this.formControl.hasError('required') ? 'Required field' :
			this.formControl.hasError('email') ? 'Not a valid email' : '';
	}

	submit() {
		console.log(this.editForm.value);
		const vals = Array.from($('.selectpicker').find(':selected')).map((item) => {
			return Number($(item).val());
		});

		// Extract Groups by their IDs
		const groups = this.data.allGroups.filter((item) => {
			console.log('item: ', item);
			if (vals.includes(item.id)) {
				return item;
			}
		});

		console.log('Final group(s): ', groups);
		// Create new user object
		this.newUser = new User();
		this.newUser.name = this.editForm.get('name').value;
		this.newUser.username = this.editForm.get('username').value;
		this.newUser.email = this.editForm.get('email').value;
		this.newUser.address = this.editForm.get('address').value;
		this.newUser.phone_no = String(this.editForm.get('phone_no').value);
		this.newUser.active = this.editForm.get('active').value;

		this.newUser.groups = groups;
		console.log('here is the updated user', JSON.stringify(this.newUser));
		this.updateUser();
	}

	updateUser() {
		this.userService.updateUser(this.data.user.id, this.newUser).subscribe(resp => {
			const msg = 'User successfully updated';
			console.log('response', resp);
			this.toggleModal.emit({ 'modalType': 'edit', button: 'update', show: false });
			this.showNotification('top', 'center', msg, 'success', 'pe-7s-check');
		}, (err) => {
			const msg = 'There was an error updating the user';
			this.showNotification('top', 'center', msg, 'danger', 'pe-7s-attention');
		});
	}

	onNoClick(): void {
		// this.dialogRef.close();
	}

	stopEdit(): void {
		// this.userService.updateUser(this.data);
	}

	cancelUpdate() {
		console.log('cancel update');
		if (this.editForm.dirty) {
			const conf = confirm('Are you sure you want to cancel?');
			if (conf) {

				this.editForm.reset({});
				$('.selectpicker').val('default');
				$('.selectpicker').selectpicker('refresh');
				this.toggleModal.emit({ 'modalType': 'edit', button: 'cancel', show: false });
			}
		} else {
			this.editForm.reset({});
			$('.selectpicker').val('default');
			$('.selectpicker').selectpicker('refresh');
			this.toggleModal.emit({ 'modalType': 'edit', button: 'cancel', show: false });
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
