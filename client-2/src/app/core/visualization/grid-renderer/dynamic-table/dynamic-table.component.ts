import { Component, OnInit, Input, ViewChild, ViewContainerRef, SimpleChanges, SimpleChange } from '@angular/core';
import { find, filter, map, each, isFunction } from 'lodash';

@Component({
  selector: 'dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss']
})
export class DynamicTableComponent implements OnInit {
	@Input() rows: any;
	@Input() columns: any;
	@Input('items-per-page') itemsPerPage: any;

	columnsToDisplay = [];
	rowsToDisplay = [];
	temp = [];

	constructor() { } 
	
	ngOnInit() {
		for (let i = 0; i < this.columns.length; i += 1) {
			this.columnsToDisplay.push({
				prop: this.columns[i].name, 
				name: this.columns[i].title,
				displayAs: this.columns[i].displayAs,
				dateTimeFormat: this.columns[i].dateTimeFormat
			});
		}

		for (let i = 0; i < this.rows.length; i += 1) {
			let row = [];
			this.columnsToDisplay.forEach((element:any) => {
				row = this.rows[i];
				let displayAs = element.displayAs;
				if(displayAs == 'datetime') {
					row[element.name] = row[element.name].format(element.dateTimeFormat);
				}
			});
			this.rowsToDisplay.push(row);
		}

		this.temp = this.rowsToDisplay;
	}

	updateFilter(event) {
		const val = event.target.value.toLowerCase();
		// filter our data
		const temp = this.temp.filter((d) => {
			let found = false;
			for(let element of this.columnsToDisplay) {
				if((d[element.name] + "").toLowerCase().indexOf(val) !== -1 || !val) {
					found = true;
					break;
				}
			}

			return found;
		});
		// update the rows
		this.rowsToDisplay = temp;
	}
}