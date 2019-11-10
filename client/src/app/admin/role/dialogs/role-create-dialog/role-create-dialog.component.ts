import { Component, OnInit, Output, Input, EventEmitter, Inject, AfterViewInit } from '@angular/core';
import { RoleService } from '../../../../services/role.service';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Role } from '../../../../models/role';

declare var $: any;

@Component({
	selector: 'role-create-dialog',
	templateUrl: './role-create-dialog.component.html',
	styleUrls: ['./role-create-dialog.component.scss']
})


export class RoleCreateDialogComponent implements OnInit, AfterViewInit {

	@Output()
	toggleModal = new EventEmitter<Object>();
	@Input() data;
	myForm: FormGroup;
	isLoading = false;
	newRecord: Role;

	constructor(public roleService: RoleService, private formBuilder: FormBuilder) {
		this.myForm = this.formBuilder.group({
			name: ['', [Validators.required]],
			description: ['', [Validators.required]],
			permissions: [''],
			active: ['']

		});
	}

	ngOnInit() { }

	ngAfterViewInit() {
		if ($('.selectpicker').length !== 0) {
			$('.selectpicker').selectpicker({
				iconBase: 'fa',
				tickIcon: 'fa-check'
			});
		}
	}

	submit() {
		console.log('Role submitted', this.myForm.value);
		const vals = Array.from($('.selectpicker').find(':selected')).map((item) => {
			return Number($(item).val());
		});

		// Extract permissions by their IDs
		const permissions = this.data.filter((item) => {
			console.log('item: ', item);
			if (vals.includes(item.id)) {
				return item;
			}
		});

		console.log('Final permission(s): ', permissions);

		// Create new object
		this.newRecord = new Role();
		this.newRecord.name = this.myForm.get('name').value;
		this.newRecord.description = this.myForm.get('description').value;
		this.newRecord.active = this.myForm.get('active').value;


		this.newRecord.permissions = permissions;

		console.log('here is the new record', this.newRecord);

		this.createNewRole();
	}

	createNewRole() {
		this.isLoading = true;
		this.roleService.createRole(this.newRecord).subscribe((response) => {
			console.log('server response: ', response);
			const msg = 'Record successfully created';
			this.isLoading = false;
			this.myForm.reset({});
			this.toggleModal.emit({ 'modalType': 'create', show: false, 'newRecord': response });
			this.showNotification('top', 'center', msg, 'success', 'pe-7s-check');
		}, (err) => {
			const msg = 'There was an error creating record'
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
