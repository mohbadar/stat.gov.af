import { Component, OnInit, Output, Input, EventEmitter, Inject, AfterViewInit } from '@angular/core';
import { GroupService } from '../../../../services/group.service';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Group } from '../../../../models/group';

declare var $: any;
@Component({
	selector: 'group-edit-dialog',
	templateUrl: './group-edit-dialog.component.html',
	styleUrls: ['./group-edit-dialog.component.scss']
})
export class GroupEditDialogComponent implements OnInit, AfterViewInit {

	@Output()
	toggleModal = new EventEmitter<Object>();
	@Input() data;
	isLoading = false;
	newRecord: Group;
	editForm: FormGroup;
	rolesController;

	formControl = new FormControl('', [
		Validators.required
	]);

	constructor(public groupService: GroupService, private formBuilder: FormBuilder) {

	}
	ngOnInit() {
	
		this.editForm = this.formBuilder.group({
			name: [this.data.group.name, [Validators.required]],
			description: [this.data.group.description, [Validators.required]],
			// roles: [[1, 2, 3], [Validators.required]],
			active: [this.data.group.active, [Validators.required]]
		});

	}

	ngAfterViewInit() {
		const that = this;
		console.log('Method called');
		const vals = [];
		this.data.roles.forEach(el => {
			vals.push(el.id);
		});
		//  Init Bootstrap Select Picker
		if ($('.selectpicker').length !== 0) {
			$('.selectpicker').selectpicker({
				iconBase: 'fa',
				tickIcon: 'fa-check'
			});
			$('.selectpicker').selectpicker('val', vals);
			$('.selectpicker').selectpicker('refresh');
		}

		$('#role').change(function (e) {
			that.rolesController = true;
			console.log($(this).val());
		});

		console.log('data all roles: ', this.data.roles);
		console.log('data roles ', vals);
	}

	submit() {
		console.log(this.editForm.value);
		const vals = $('.selectpicker').val();

		console.log('Values are: ', vals);


		// Extract Rolls by their IDs
		const roles = this.data.allRoles.filter((item) => {
			console.log('item: ', item);
			if (vals.includes(item.id.toString())) {
				return item;
			}
		});

		console.log('Final roles(s): ', roles);
		// Create new object
		this.newRecord = new Group();
		this.newRecord.name = this.editForm.get('name').value;
		this.newRecord.description = this.editForm.get('description').value;
		this.newRecord.active = this.editForm.get('active').value;


		this.newRecord.roles = roles;
		console.log('here is the updated record', this.newRecord);
		this.updateRecord();
	}

	updateRecord() {
		this.groupService.updateGroup(this.data.group.id, this.newRecord).subscribe(resp => {
			const msg = 'Record successfully updated';
			console.log('response', resp);
			this.toggleModal.emit({ 'modalType': 'edit', show: false, 'newRecord': resp });
			this.showNotification('top', 'center', msg, 'success', 'pe-7s-check');
		}, (err) => {
			const msg = 'There was an error updating the record'
			this.showNotification('top', 'center', msg, 'danger', 'pe-7s-attention');
		});
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
