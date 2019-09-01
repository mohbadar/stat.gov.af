import { Component, OnInit, Output, Input, EventEmitter, Inject, AfterViewInit } from '@angular/core';
import { RoleService } from '../../../../services/role.service';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Role } from '../../../../models/role';

declare var $: any;


@Component({
	selector: 'role-edit-dialog',
	templateUrl: './role-edit-dialog.component.html',
	styleUrls: ['./role-edit-dialog.component.scss']
})

export class RoleEditDialogComponent implements OnInit, AfterViewInit {
	@Output()
	toggleModal = new EventEmitter<Object>();

	isLoading = false;
	newRole: Role;
	editForm: FormGroup;
	@Input() data;

	formControl = new FormControl('', [
		Validators.required
	]);


	constructor(public roleService: RoleService, private formBuilder: FormBuilder) { }

	ngOnInit() {
		// console.log('Dialog: ', this.data);
		this.editForm = this.formBuilder.group({
			name: [this.data.role.name, [Validators.required]],
			description: [this.data.role.description, [Validators.required]],
			active: this.data.role.active
		});
	}

	ngAfterViewInit() {
		console.log('Method called');
		const vals = [];
		this.data.permissions.forEach(el => {
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

		// console.log('data groups: ', this.data.permissions);
		// console.log('data: ', vals);
	}

	submit() {
		console.log(this.editForm.value);
		const vals = Array.from($('.selectpicker').find(':selected')).map((item) => {
			return Number($(item).val());
		});

		// Extract permissions by their IDs
		const permissions = this.data.allPermissions.filter((item) => {
			console.log('item: ', item);
			if (vals.includes(item.id)) {
				return item;
			}
		});

		console.log('Final group(s): ', permissions);
		// Create new role object
		this.newRole = new Role();
		this.newRole.name = this.editForm.get('name').value;
		this.newRole.description = this.editForm.get('description').value;
		this.newRole.active = this.editForm.get('active').value;

		this.newRole.permissions = permissions;
		console.log('here is the updated role', JSON.stringify(this.newRole));
		this.updateRole();
	}

	updateRole() {
		this.roleService.updateRole(this.data.role.id, this.newRole).subscribe(resp => {
			const msg = 'Role successfully updated';
			console.log('response', resp);
			this.toggleModal.emit({ 'modalType': 'edit', button: 'update', show: false, 'newRecord': resp });
			this.showNotification('top', 'center', msg, 'success', 'pe-7s-check');
		}, (err) => {
			const msg = 'There was an error updating the role';
			this.showNotification('top', 'center', msg, 'danger', 'pe-7s-attention');
		});
	}

	onNoClick(): void {
		// this.dialogRef.close();
	}

	stopEdit(): void {
		// this.roleService.updateRole(this.data);
	}

	cancelUpdate() {
		if (this.editForm.dirty) {
			const conf = confirm('Are you sure you want to cancel?');
			if (conf) {

				this.editForm.reset({});
				$('.selectpicker').val('default');
				$('.selectpicker').selectpicker('refresh');
				this.toggleModal.emit({ 'modalType': 'edit', button: 'cancel', show: false });
			}
		} else {
			$('.selectpicker').val('default');
			$('.selectpicker').selectpicker('refresh');
			this.toggleModal.emit({ 'modalType': 'edit', show: false });
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
