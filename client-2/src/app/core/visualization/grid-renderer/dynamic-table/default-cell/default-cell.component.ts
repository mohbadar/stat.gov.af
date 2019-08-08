import { Component, OnInit, Input, SimpleChange, SimpleChanges } from '@angular/core';
import { includes, identity } from 'lodash';
import { renderDefault, renderImage, renderLink } from './utils';

@Component({
  selector: 'dynamic-table-default-cell',
  templateUrl: './default-cell.component.html',
  styleUrls: ['./default-cell.component.scss']
})
export class DefaultCellComponent implements OnInit {
	@Input() row: any;
	@Input() column: any;

	allowHTML;
	value;
	renderValue;
	sanitize;

	constructor() { }

	ngOnChanges(changes: SimpleChanges) {
		
		const row: SimpleChange = changes.row;
		if (!row.isFirstChange() && changes.columns) {
			this.value = this.sanitize(this.renderValue(this.column, this.row));
		}
	}

	ngOnInit() {

		// `dynamicTable` will recreate all table cells if some columns changed.
		// This means two things:
		// 1. `column` object will be always "fresh" - no need to watch it.
		// 2. we will always have a column object already available in `link` function.
		// Note that `row` may change during this directive's lifetime.

		if (this.column.displayAs === 'string') {
			this.allowHTML = this.column.allowHTML;
		} else {
			this.allowHTML = includes(['image', 'link'], this.column.displayAs);
		}
			
		// this.sanitize = this.allowHTML ? $sanitize : identity;
		this.sanitize = identity;

		this.renderValue = renderFunctions[this.column.displayAs] || renderDefault;
			
		this.value = this.sanitize(this.renderValue(this.column, this.row));
	}

}

const renderFunctions = {
	image: renderImage,
	link: renderLink,
};
