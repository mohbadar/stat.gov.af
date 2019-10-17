import { Component, OnInit } from '@angular/core';
import { DatasourceDashboardService } from 'app/services/datasource.dashboard.service';
import { DatasourceWidgetService } from 'app/services/datasource.widget.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-edit-dashboard',
	templateUrl: './edit-dashboard.component.html',
	styleUrls: ['./edit-dashboard.component.scss']
})
export class EditDashboardComponent implements OnInit {
	recordId: any;
	dashboard: any;
	showCreateModal: boolean;
	showEditModal: boolean;
	loading: boolean;
	allWidgets: any;

	constructor(
		private datasourceDashboardService: DatasourceDashboardService,
		private datasourceWidgetService: DatasourceWidgetService,
		private router: Router
	) { }

	ngOnInit() {

		this.recordId = history.state.recordId;
		console.log('record ID: ', this.recordId);


		// console.log('Dashboard ID: ', this.router.getCurrentNavigation().extras.state);


		this.datasourceDashboardService.loadById(this.recordId).subscribe((data) => {
			this.dashboard = data;
			console.log('Data', data);
			

		}, (err) => {

			console.log('Dashboard ID doesn\'t exist!');
			this.router.navigate(['/custom/my-dashboards']);

		});

	}


	reloadData() {
		// this.result = [];
		this.datasourceDashboardService.loadById(this.recordId).subscribe(data => {
			this.dashboard = data;

		}, (err) => {
			console.log('data error: ', err);
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



	addNew() {
		// if (!this.globals.principal.hasAuthority(['ROLE_CREATE', 'ADMIN'])) {
		// 	return false;
		// }
		this.loading = true;

		this.datasourceWidgetService.loadWidgets().subscribe((data) => {
			this.allWidgets = data;
			console.log('all widgets are:', this.allWidgets);
			this.loading = false;
			$('#createModal').modal();
			this.showCreateModal = true;
		});

	}




}
