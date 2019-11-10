import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DatasourceService } from './../../../../services/datasource.service';

declare var $: any;

@Component({
	selector: 'datasource-view-dialog',
	templateUrl: './datasource-view-dialog.component.html',
	styleUrls: ['./datasource-view-dialog.component.scss']
})
export class DatasourceViewDialogComponent implements OnInit {
	@Output()
	toggleModal = new EventEmitter<Object>();
	@Input() data;

	constructor(public datasourceService: DatasourceService) { }

	ngOnInit() {
	}

	onNoClick(): void {
		// this.dialogRef.close();
	}
}
