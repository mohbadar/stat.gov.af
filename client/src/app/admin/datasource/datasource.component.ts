
import { Component, ViewChild, OnInit, ElementRef, ChangeDetectorRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Datasource } from './../../models/datasource';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './../../services/auth.service';
import { DatasourceService } from '../../services/datasource.service';
import { DatatablesService } from '../../services/datatables.service';
import { Globals } from '../../core/_helpers/globals';

declare var $: any;

@Component({
	selector: 'datasource-management',
	templateUrl: './datasource.component.html',
	styleUrls: ['./datasource.component.scss']
})

export class DatasourceComponent implements OnInit, OnDestroy {
	datasources: Observable<Datasource[]>;
	result: Datasource[];
	recordData;
	showEditModal;
	showViewModal;
	showCreateModal;
	dataTablesObservable;
	dTableFlag = false;
	dTable;
	headerRow = ['id', 'name', 'host', 'active', 'port', 'user_name', 'db_pswrd', 'SSL', 'db_name', 'actions'];
	loading;
	viewLoading;
	editLoading;

	// datatables options
	dtOptions = {};


	constructor(public httpClient: HttpClient,
		private datasourceService: DatasourceService,
		public authService: AuthService,
		public globals: Globals,
		private cdref: ChangeDetectorRef,
		private dataSource: DatasourceService,
		private datatables: DatatablesService
	) { }

	ngOnInit() {
		this.reloadData();
		this.dtOptions = {
			'pagingType': 'full_numbers',
			'lengthMenu': [[10, 25, 50, -1], [10, 25, 50, 'All']],
			responsive: true,
			language: this.datatables.selectedJsonFile
		};
		this.changeLanguage();

	}

	toggleModal(data) {
		$('#createModal').modal('hide');
		if (data.modalType === 'create') {
			$('#createModal').modal('hide');
			$('#createModal').on('hidden.bs.modal', (e) => {
				this.showCreateModal = false;
				if (data.newRecord) {
					this.reloadData();
				}
			});
		}

		if (data.modalType === 'edit') {
			$('#editModal').modal('hide');
			$('#editModal').on('hidden.bs.modal', (e) => {
				this.showEditModal = false;
				// this.result.push(data.newRecord);
			});
		}
	}


	refresh() {
		this.reloadData();
		this.dtOptions = {
			'pagingType': 'full_numbers',
			'lengthMenu': [[10, 25, 50, -1], [10, 25, 50, 'All']],
			responsive: true,
			language: this.datatables.selectedJsonFile
		};
	}

	changeLanguage() {
		this.dataTablesObservable = this.datatables.callToServiceMethodSource.subscribe(data => {
			this.dtOptions['oLanguage'] = data.default;
			if (this.dTableFlag) {
				// Initialize datatable if not initialized before
				if (!$.fn.DataTable.isDataTable('#datatables')) {
					this.dTable = $('#datatables').DataTable(this.dtOptions);
				} else {
					console.log('dtOptions: ', this.dtOptions);
					this.dTable.destroy();
					this.dTable = null;
					this.dTable = $('#datatables').DataTable(this.dtOptions);
				}
			}
		});

	}


	reloadData() {
		this.loading = true;
		// this.result = [];
		this.dTableFlag = false;
		this.datasourceService.getDatasourceList().subscribe(data => {
			this.result = data;
			this.dTableFlag = true;
			this.cdref.detectChanges();
			this.loading = false;

			this.initTable();
			// console.log('roles data ', this.result);

		}, (err) => {
			console.log('data error: ', err);
		});
	}

	initTable() {
		// Initialize datatable if not initialized before
		if (!$.fn.DataTable.isDataTable('#datatables')) {
			console.log('Initialized in reloadData');
			this.dTable = $('#datatables').DataTable(this.dtOptions);
		} else {
			console.log('Reinitialized in reloadDatd');
			this.dTable.destroy();
			this.dTable = null;
			this.dTable = $('#datatables').DataTable(this.dtOptions);
		}

	}





	addNew() {
		if (!this.globals.principal.hasAuthority(['DATASOURCE_NEW', 'ADMIN'])) {
			return false;
		}

		$('#createModal').modal();
		this.showCreateModal = true;

	}


	viewRecord(recordId) {
		if (!this.viewLoading) {
			this.viewLoading = true;
			if (!this.globals.principal.hasAuthority(['DATASOURCE_VIEW', 'ADMIN'])) {
				return false;
			}

			const projectObs = this.datasourceService.getDatasource(recordId).subscribe(data => {
				console.log('THE DATA SOURCE TO BE VIEWED', data);
				this.viewLoading = false;
				this.recordData = data;
				$('#showModal').modal();
				this.showViewModal = true;
			});
		}
	}


	editRecord(recordId) {
		if (!this.editLoading) {
			this.editLoading = true;
			if (!this.globals.principal.hasAuthority(['DATASOURCE_EDIT', 'ADMIN'])) {
				return false;
			}

			this.datasourceService.getDatasource(recordId).subscribe(data => {
				console.log('THE DATA SOURCE TO BE EDITED', data);
				this.recordData = data;
				this.editLoading = false;
				$('#editModal').modal();
				this.showEditModal = true;
			});
		}
	}

	ngOnDestroy() {
		if (this.dataTablesObservable) {
			this.dataTablesObservable.unsubscribe();
		}
	}

} 