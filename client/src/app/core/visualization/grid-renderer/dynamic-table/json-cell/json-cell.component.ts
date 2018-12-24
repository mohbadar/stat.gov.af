import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dynamic-table-json-cell',
  templateUrl: './json-cell.component.html',
  styleUrls: ['./json-cell.component.scss']
})
export class JsonCellComponent implements OnInit {
	@Input() value: any;
	@Input() column: any;

	constructor() { }

	ngOnInit() {
	}

}
