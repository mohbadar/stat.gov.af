import { Component, OnInit, Output, Input, EventEmitter, Inject, AfterViewInit } from '@angular/core';
import { GroupService } from '../../../../services/group.service';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Group } from '../../../../models/group';

declare var $: any;

@Component({
	selector: 'group-create-dialog',
	templateUrl: './group-create-dialog.component.html',
	styleUrls: ['./group-create-dialog.component.scss']
})
export class GroupCreateDialogComponent implements OnInit, AfterViewInit {

	@Output()
	toggleModal = new EventEmitter<Object>();
	@Input() data;
	myForm: FormGroup;
	isLoading = false;
	newRecord: Group;

	constructor(
		public groupService: GroupService,
		private formBuilder: FormBuilder) {
		this.myForm = this.formBuilder.group({
			name: ['', [Validators.required]],
			description: ['', [Validators.required]],
			active: [''],
			roles: ['']
		});
	}

	ngOnInit() {
		console.log('group coming is::', this.data);
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
		console.log('group submitted', this.myForm.value);
		const vals = Array.from($('.selectpicker').find(':selected')).map((item) => {
			return Number($(item).val());
		});

		// Extract Groups by their IDs
		const roles = this.data.filter((item) => {
			console.log('item: ', item);
			if (vals.includes(item.id)) {
				return item;
			}
		});

		console.log('Final group(s): ', roles);

		// Create new object
		this.newRecord = new Group();
		this.newRecord.name = this.myForm.get('name').value;
		this.newRecord.description = this.myForm.get('description').value;
		this.newRecord.active = this.myForm.get('active').value;
		this.newRecord.roles = roles;

		console.log('here is the new record', this.newRecord);

		this.createNewGroup();
	}

	createNewGroup() {
		this.isLoading = true;
		this.groupService.createGroup(this.newRecord).subscribe((response) => {
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
