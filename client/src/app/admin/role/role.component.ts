import { Component, OnInit, ChangeDetectorRef, AfterViewInit, OnDestroy } from '@angular/core';
import { RoleService } from './../../services/role.service';
import { PermissionService } from './../../services/permission.service';
import { Role } from './../../models/role';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './../../services/auth.service';
import { DatatablesService } from '../../services/datatables.service';
import { Globals } from '../../core/_helpers/globals';

declare var $: any;

@Component({
	selector: 'role',
	templateUrl: './role.component.html',
	styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit, OnDestroy, AfterViewInit {

	result: Role[];
	roleData;
	allPermissionsData;
	showEditModal;
	showViewModal;
	showCreateModal;
	dataTablesObservable;
	dTable;
	dTableFlag = false;

	// datatables options
	dtOptions = {};

	headerRow = ['Id', 'Name', 'Description', 'active', 'Actions'];
	isLoading = true;
	loading;
	viewLoading;
	editLoading;

	constructor(public httpClient: HttpClient,
		private roleService: RoleService,
		private permissionService: PermissionService,
		public authService: AuthService,
		public globals: Globals,
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

	ngAfterViewInit() {
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


	toggleModal(data) {
		$('#createModal').modal('hide');
		if (data.modalType === 'create') {
			$('#createModal').modal('hide');
			$('#createModal').on('hidden.bs.modal', (e) => {
				$('#createModal').off('hidden.bs.modal');
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
				$('#editModal').off('hidden.bs.modal');
				if (data.button === 'update') {
					console.log('Update');
					this.reloadData();
				}
			});
		}
	}

	refresh() {
		this.reloadData();
	}

	reloadData() {
		// this.result = [];
		this.loading = true;
		this.dTableFlag = false;
		this.roleService.getRolesList().subscribe(data => {
			this.result = data;
			this.dTableFlag = true;
			this.cdref.detectChanges();
			this.loading = false;

			this.initTable();
			this.isLoading = false;
			// console.log('roles data ', this.result);

		}, (err) => {
			console.log('data error: ', err);
			this.loading = false;
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

	addNew(role?: Role) {
		this.loading = true;

		if (!this.globals.principal.hasAuthority(['ROLE_CREATE', 'ADMIN'])) {
			return false;
		}
		this.permissionService.getPermissionsList().subscribe((permissions) => {
			this.allPermissionsData = permissions;
			console.log('all permissions are:', this.allPermissionsData);
			this.loading = false;
			$('#createModal').modal();
			this.showCreateModal = true;

		});

	}

	viewRecord(recordId) {
		if (!this.viewLoading) {
			this.viewLoading = true;

			if (!this.globals.principal.hasAuthority(['ADMIN', 'ROLE_VIEW'])) {
				return false;
			}
			this.roleService.getRole(recordId).subscribe(data => {
				this.viewLoading = false;

				this.roleData = data;
				$('#showModal').modal();
				this.showViewModal = true;
			}, err => {
				this.viewLoading = false;
			});
		}
	}

	editRecord(recordId) {
		if (!this.editLoading) {
			this.editLoading = true;
			if (!this.globals.principal.hasAuthority(['ADMIN', 'ROLE_EDIT'])) {
				return false;
			}

			this.roleService.getRole(recordId).subscribe(data => {
				this.editLoading = false;
				// console.log('the role coming is:' + JSON.stringify(data));
				this.roleData = data;
				$('#editModal').modal();
				this.showEditModal = true;
			}, err => {
				this.editLoading = false;
			});
		}
	}


	ngOnDestroy() {
		if (this.dataTablesObservable) {
			this.dataTablesObservable.unsubscribe();
		}
	}
}
