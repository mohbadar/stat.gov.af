import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { GroupService } from './../../services/group.service'
import { Group } from './../../models/group'
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RoleService } from './../../services/role.service';
import { AuthService } from '../../services/auth.service';
import { Role } from '../../models/role';
import { DatasourceService } from '../../services/datasource.service';
import { DatatablesService } from '../../services/datatables.service';
import { Globals } from '../../core/_helpers/globals';

declare var $: any;

@Component({
	selector: 'group',
	templateUrl: './group.component.html',
	styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit, OnDestroy {

	groups: Observable<Group[]>;
	result: Group[];
	allRoles;
	recordData;
	showEditModal;
	showViewModal;
	dataTablesObservable;
	showCreateModal;
	dTableFlag = false;
	dTable;
	loading;
	viewLoading;
	editLoading;

	// datatables options
	dtOptions = {};
	headerRow = ['id', 'name', 'description', 'active', 'actions'];
	isLoading = true;


	constructor(public httpClient: HttpClient,
		public authService: AuthService,
		public globals: Globals,
		public groupService: GroupService,
		public roleService: RoleService,
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
				this.showCreateModal = false;
				$('#createModal').off('hidden.bs.modal');
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

	public applyFilter(value: string) {
		// this.dataSource.filter = value.trim().toLocaleLowerCase();
	}

	refresh() {
		this.reloadData();
	}

	private refreshTable() {
		// Refreshing table using paginator
		// this.paginator._changePageSize(this.paginator.pageSize);
	}

	reloadData() {
		// this.result = [];
		this.loading = true;
		this.dTableFlag = false;
		this.groupService.getGroupsList().subscribe(data => {
			this.result = data;
			this.dTableFlag = true;
			this.loading = false;
			this.cdref.detectChanges();

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

	addNew(group?: Group) {
		this.loading = true;
		if (!this.globals.principal.hasAuthority(['GROUP_CREATE', 'ADMIN'])) {
			return false;
		}
		this.roleService.getRolesList().subscribe(rolesData => {
			this.loading = false;
			this.allRoles = rolesData;
			console.log('all roles are:', this.allRoles);
			$('#createModal').modal();
			this.showCreateModal = true;

		}, err => {
			console.log('Error: ', err);
			this.loading = false;
		});
	}

	viewRecord(recordId) {
		if (!this.viewLoading) {
			this.viewLoading = true;
			if (!this.globals.principal.hasAuthority(['GROUP_VIEW'])) {
				return false;
			}

			this.isLoading = true;
			this.groupService.getGroup(recordId).subscribe(data => {
				this.viewLoading = false;
				console.log('you data has', data);
				this.isLoading = false;
				this.recordData = data;
				$('#showModal').modal();
				this.showViewModal = true;
			});
		}
	}

	editRecord(recordId) {
		if (!this.editLoading) {
			this.editLoading = true;
			if (!this.globals.principal.hasAuthority(['GROUP_EDIT', 'ADMIN'])) {
				return false;
			}
			this.isLoading = true;
			this.groupService.getGroup(recordId).subscribe(data => {
				console.log('the group returned is', data);
				this.editLoading = false;
				this.recordData = data;
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


