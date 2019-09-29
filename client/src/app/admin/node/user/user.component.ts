import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { RoleService } from './../../../services/node/role.service';
import { UserService } from './../../../services/node/user.service';
import { AuthService } from './../../../services/auth.service';
import { DatasourceService } from '../../../services/datasource.service';

import { Globals } from '../../../core/_helpers/globals';
import { User } from './../../../models/user'
import { DatatablesService } from '../../../services/datatables.service';

declare var $: any;

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

	users: Observable<User[]>;
	result: User[];
	userData;
	allGroupsData;
	showEditModal;
	showViewModal;
	showCreateModal;
	dataTablesObservable;
	dTableFlag = false;
	dTable;
	loading;
	viewLoading;
	editLoading;

	// datatables options
	dtOptions = {};

	headerRow = ['Id', 'Name', 'Username', 'Phone', 'Email', 'Last Login', 'Actions'];
	isLoading = true;

	constructor(public httpClient: HttpClient,
		private userService: UserService,
		private roleService: RoleService,
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
		// $('#createModal').modal('hide');
		if (data.modalType === 'create') {
			$('#createModal').modal('hide');
			$('#createModal').on('hidden.bs.modal', (e) => {
				console.log('data : ', data);
				this.showCreateModal = false;
				$('#createModal').off('hidden.bs.modal');
				if (data.newRecord) {
					this.reloadData();
				}
			});
		}

		if (data.modalType === 'edit') {
			console.log('Called toggle modal');
			$('#editModal').modal('hide');
			$('#editModal').on('hidden.bs.modal', (e) => {
				this.showEditModal = false;
				console.log('Modal button: ', data.button);
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
		this.userService.loadAllUsers().subscribe(data => {
      console.log("USers", data);
      
			this.result = data;
			this.dTableFlag = true;
			this.cdref.detectChanges();
			this.loading = false;

			this.initTable();
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

	addNew(user?: User) {
		this.loading = true;

		// if (!this.globals.principal.hasAuthority(['USER_CREATE', 'ADMIN'])) {
		// 	return false;
		// }
		this.roleService.loadAllRoles().subscribe(groupsData => {
			this.allGroupsData = groupsData;
			console.log('All groups ', this.allGroupsData);
			this.loading = false;

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
			// if (!this.globals.principal.hasAuthority(['ADMIN', 'USER_VIEW'])) {
			// 	return false;
			// }
			this.userService.loadUser(recordId).subscribe(data => {
				this.viewLoading = false;

				this.userData = data;
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
			// if (!this.globals.principal.hasAuthority(['ADMIN', 'USER_EDIT'])) {
			// 	this.editLoading = false;
			// 	return false;

			// }

			this.userService.loadUser(recordId).subscribe(data => {
				this.editLoading = false;
				console.log('the user coming is:', data);
				this.userData = data;
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
