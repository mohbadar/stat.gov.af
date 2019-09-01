import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DatasourceService } from '../../../../services/datasource.service';
import { Datasource } from './../../../../models/datasource';
declare var $: any;

@Component({
	selector: 'datasource-create-dialog',
	templateUrl: './datasource-create-dialog.component.html',
	styleUrls: ['./datasource-create-dialog.component.scss']
})
export class DatasourceCreateDialogComponent implements OnInit {
	@Output()
	toggleModal = new EventEmitter<Object>();
	@Input() data;

	isLoading = false;
	newDataSource: Datasource;
	myForm: FormGroup;
	// passwordMatch = true;

	constructor(
		public dataSourceService: DatasourceService,
		private formBuilder: FormBuilder
	) {

		this.myForm = this.formBuilder.group({
			name: ['', [Validators.required]],
			host: ['', [Validators.required]],
			active: [''],
			port: ['', [Validators.required]],
			user_name: ['', [Validators.required]],
			db_pswrd: ['', [Validators.required]],
			ssl: ['', [Validators.required]],
			db_name: ['', [Validators.required]],
		});
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
		this.newDataSource = new Datasource();
		this.newDataSource.name = this.myForm.get('name').value;
		this.newDataSource.host = this.myForm.get('host').value;
		this.newDataSource.active = this.myForm.get('active').value;
		this.newDataSource.port = this.myForm.get('port').value;
		this.newDataSource.userName = this.myForm.get('user_name').value;
		this.newDataSource.db_pswrd = this.myForm.get('db_pswrd').value;
		this.newDataSource.ssl = this.myForm.get('ssl').value;
		this.newDataSource.db_Name = this.myForm.get('db_name').value;

		console.log('here is the new datasource', JSON.stringify(this.newDataSource));

		this.createNewDataSource();
	}



	onNoClick(): void {
		// this.dialogRef.close();
	}

	stopEdit(): void {
		// this.userService.updateUser(this.data);
	}

	createNewDataSource() {
		this.isLoading = true;
		console.log("send the data :", this.newDataSource);
		this.dataSourceService.createDatasource(this.newDataSource).subscribe((response) => {
			console.log('server response: ', response);
			const msg = 'New record successfully created';
			this.isLoading = false;
			this.myForm.reset({});
			this.toggleModal.emit({ "modalType": "create", show: false, "newRecord": response });
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
				this.toggleModal.emit({ "modalType": "create", show: false });
			}
		} else {
			$('.selectpicker').val('default');
			$('.selectpicker').selectpicker('refresh');
			this.toggleModal.emit({ "modalType": "create", show: false });
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
