import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DatasourceService } from './../../../../services/datasource.service';
import { Datasource } from './../../../../models/datasource';


declare var $: any;

@Component({
	selector: 'datasource-edit-dialog',
	templateUrl: './datasource-edit-dialog.component.html',
	styleUrls: ['./datasource-edit-dialog.component.scss']
})
export class DatasourceEditDialogComponent implements OnInit {

	@Output()
	toggleModal = new EventEmitter<Object>();
	isLoading = false;
	newDatasource: Datasource;
	editForm: FormGroup;
	@Input() data;


	constructor(public datasourceService: DatasourceService, private formBuilder: FormBuilder) { }

	ngOnInit() {
		console.log('Dialog: ', this.data);
		this.editForm = this.formBuilder.group({
			name: [this.data.name, [Validators.required]],
			host: [this.data.host, [Validators.required]],
			active: [this.data.active, [Validators.required]],
			port: [this.data.port, [Validators.required]],
			userName: [this.data.userName, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
			db_pswrd: [this.data.db_pswrd, [Validators.required]],
			ssl: [this.data.ssl, [Validators.required]],
			db_Name: [this.data.db_Name, [Validators.required]]

		});
	}

	ngOnDestroy() {

	}

	ngAfterViewInit() {
	}

	submit() {
		this.newDatasource = new Datasource();
		this.newDatasource.name = this.editForm.get('name').value;
		this.newDatasource.host = this.editForm.get('host').value;
		this.newDatasource.port = this.editForm.get('port').value;
		this.newDatasource.active = this.editForm.get('active').value;
		this.newDatasource.userName = this.editForm.get('userName').value;
		this.newDatasource.db_pswrd = this.editForm.get('db_pswrd').value;
		this.newDatasource.ssl = this.editForm.get('ssl').value;
		this.newDatasource.db_Name = this.editForm.get('db_Name').value;

		console.log('here is the updated datasource', JSON.stringify(this.newDatasource));

		this.updateDataSource();
	}

	updateDataSource() {
		this.datasourceService.updateDatasource(this.data.id, this.newDatasource).subscribe(resp => {
			const msg = 'User successfully updated';
			console.log('response', resp);
			this.toggleModal.emit({ "modalType": "edit", show: false, "newRecord": resp });
			this.showNotification('top', 'center', msg, 'success', 'pe-7s-check');
		}, (err) => {
			const msg = 'There was an error updating the user'
			this.showNotification('top', 'center', msg, 'danger', 'pe-7s-attention');
		});
	}

	onNoClick(): void {
		// this.dialogRef.close();
	}

	stopEdit(): void {

	}

	cancelUpdate() {
		if (this.editForm.dirty) {
			const conf = confirm('Are you sure you want to cancel?');
			if (conf) {

				this.editForm.reset({});
				$('.selectpicker').val('default');
				$('.selectpicker').selectpicker('refresh');
				this.toggleModal.emit({ "modalType": "edit", show: false });
			}
		} else {
			$('.selectpicker').val('default');
			$('.selectpicker').selectpicker('refresh');
			this.toggleModal.emit({ "modalType": "edit", show: false });
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
