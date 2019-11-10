import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RoleService } from './../../services/role.service';
import { AuthService } from './../../services/auth.service';
import { Permission } from '../../models/permission';
import { DatasourceService } from '../../services/datasource.service';
import { DatatablesService } from '../../services/datatables.service';
import { PermissionService } from 'app/services/permission.service';

declare var $: any;

@Component({
	selector: 'permission',
	templateUrl: './permission.component.html',
	styleUrls: ['./permission.component.scss']
})
export class PermissionComponent implements OnInit, OnDestroy {
	permissions: Observable<Permission[]>;
	result: Permission[];
	headerRow = ['id', 'name', 'description', 'active'];
	isLoading = true;
	dataTablesObservable;
	dTable;
	dTableFlag = false;
	// datatables options
	dtOptions = {};
	loading;

	constructor(public httpClient: HttpClient,
		private permissionService: PermissionService,
		public authService: AuthService,
		private cdref: ChangeDetectorRef,
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

	refresh() {
		this.reloadData();
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
		// this.result = [];
		this.loading = true;
		this.dTableFlag = false;
		this.permissionService.getPermissionsList().subscribe(data => {
			this.result = data;
			this.dTableFlag = true;
			this.cdref.detectChanges();
			this.loading = false;

			this.initTable();
			this.isLoading = false;
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



	ngOnDestroy() {
		if (this.dataTablesObservable) {
			this.dataTablesObservable.unsubscribe();
		}
	}
}
