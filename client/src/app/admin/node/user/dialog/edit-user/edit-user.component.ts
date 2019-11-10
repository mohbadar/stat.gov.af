import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { User } from '../../../../../models/user';
import { UserService } from '../../../../../services/node/user.service';
import { RoleService } from '../../../../../services/node/role.service';
declare var $: any;


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  @Output()
	toggleModal = new EventEmitter<Object>();

	isLoading = false;
	newUser: User;
	editForm: FormGroup;
  @Input() data;

	formControl = new FormControl('', [
		Validators.required
	]);
  userRoles: any;
  allRoles;
  passwordMatch: boolean;

	constructor(public userService: UserService, private formBuilder: FormBuilder, private roleService:RoleService) {
          this.roleService.loadAllRoles().subscribe(data => {
            this.allRoles = data;
        });
   }

	compareFn(c1, c2): boolean {
		return c1 && c2 ? c1.id === c2.id : c1 === c2;
	}

	ngOnInit() {
		console.log('Dialog: ', this.data);
		this.editForm = this.formBuilder.group({
			fullName: [this.data.fullName, [Validators.required]],
			username: [this.data.username, [Validators.required, Validators.minLength(3)]],
			mobileNumber: [this.data.mobileNumber, [Validators.required, Validators.minLength(10), Validators.maxLength(13)]],
			email: [this.data.email, [Validators.required, Validators.email]],
			password: ['', [Validators.required]],
			confirm_password: [''],
    }, { validator: this.checkPasswords });
    
    this.userRoles = JSON.parse(JSON.stringify(this.data.roles));
	}

	checkPasswords(group: FormGroup) { // here we have the 'passwords' group
		const pass = group.controls.password.value;
		const confirmPass = group.controls.confirm_password.value;
		return pass === confirmPass ? null : { notSame: true }
  }
  
  checkPassword(pass, confPass) {
		if (pass !== confPass) {
			this.passwordMatch = false;
		} else {
			this.passwordMatch = true;
		}
	}

	ngOnDestroy() {
		// this.toggleModal.unsubscribe();
	}

	ngAfterViewInit() {
   const vals = [];
    
		this.allRoles.forEach(el => {
			vals.push(el);
    });
    
    
		//  Init Bootstrap Select Picker
		if ($('.selectpicker').length !== 0) {
			$('.selectpicker').selectpicker({
				iconBase: 'fa',
				tickIcon: 'fa-check'
			});
			$('.selectpicker').selectpicker('val', vals);
		}

		console.log('data: ', vals);
	}

	getErrorMessage() {
		return this.formControl.hasError('required') ? 'Required field' :
			this.formControl.hasError('email') ? 'Not a valid email' : '';
	}

	submit() {


    const vals = Array.from($('.selectpicker').find(':selected')).map((item) => {
			return String($(item).val());
		});
		// Extract permissions by their IDs
		const roles = this.allRoles.filter((item) => {
			if (vals.indexOf(item._id) != -1) {
				return item;
			}
		});

		console.log('users roles are:', roles);

		const formJson = {
      'id': this.data.id,
			'fullName': this.editForm.get('fullName').value,
			'username': this.editForm.get('username').value,
			'mobileNumber': this.editForm.get('mobileNumber').value,
			'email': this.editForm.get('email').value,
			'password': this.editForm.get('password').value,
			'roles': JSON.stringify(roles)
		};

	  	console.log('here is the new user', formJson);

      this.isLoading = true;
      this.userService.update(formJson).subscribe((response) => {
        console.log('server response: ', response);
        const msg = 'User successfully created';
        this.isLoading = false;
        this.editForm.reset({});
        this.toggleModal.emit({ 'modalType': 'create', show: false, newRecord: this.newUser });
        // this.showNotification('top', 'center', msg, 'success', 'pe-7s-check');
      }, (err) => {
        const msg = 'There was an error creating user'
        // this.showNotification('top', 'center', msg, 'danger', 'pe-7s-attention');
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
