import { Component, OnInit, Input, SimpleChanges, SimpleChange, ElementRef, ViewChild, HostListener } from '@angular/core';
import { QueryResult } from '../../models/query-result';
import numberFormat from 'underscore.string/numberFormat';
import { isNumber } from 'lodash';
import { Visualization } from '../../models/visualization';
import { debounce } from 'lodash';

@Component({
	selector: 'counter-renderer',
	templateUrl: './counter-renderer.component.html',
	styleUrls: ['./counter-renderer.component.scss']
})
export class CounterRendererComponent implements OnInit {
	@Input('visualization') visualization: Visualization;
	@Input('options') options: any;
	@Input('query-result') queryResult: QueryResult;

	@ViewChild('counter', { static: false }) counterRendererContainer: ElementRef;
	rootNode;
	visualizationRendererEl;
	counterChildDiv;
	fontSize = '1em';
	counterValue;
	counterLabel = '';
	targetValue = null;
	stringPrefix;
	stringSuffix;
	delta;
	trendPositive;
	isNumber;
	handleResize;
	scale = 1;

	constructor() { }

	ngOnChanges(changes: SimpleChanges) {

		const options: SimpleChange = changes.options;
		if (!options.isFirstChange() && changes.options) {
			this.refreshData();
		}

		const queryResult: SimpleChange = changes.queryResult;
		if (!queryResult.isFirstChange() && changes.queryResult) {
			this.refreshData();
		}
	}

	ngOnInit() {
		this.rootNode = this.counterRendererContainer;
		this.rootNode = this.rootNode.nativeElement;

		// this.rootNode = $element[0].querySelector('counter');
		this.refreshData();
		this.handleResize = debounce(this.updateSize, 250);
	}

	ngAfterViewInit() {
		this.visualizationRendererEl = this.rootNode.closest('visualization-renderer');
		this.counterChildDiv = this.rootNode.children[0];
		this.handleResize();
	}

	@HostListener('window:resize', ['$event'])
	onResize(event) {
		this.handleResize();
	}

	updateSize() {
		const scale = Math.min(
			this.rootNode.offsetWidth / this.counterChildDiv.offsetWidth,
			this.rootNode.offsetHeight / this.counterChildDiv.offsetHeight
		);
		this.scale = Math.floor(scale * 100) / 100; // keep only two decimal places
	}

	refreshData() {
		const queryData = this.queryResult.getData();
		if (queryData) {
			const rowNumber = getRowNumber(this.options.rowNumber, queryData.length);
			const targetRowNumber = getRowNumber(this.options.targetRowNumber, queryData.length);
			const counterColName = this.options.counterColName;
			const targetColName = this.options.targetColName;

			if (this.options.countRow) {
				this.counterValue = queryData.length;
			} else if (counterColName) {
				this.counterValue = queryData[rowNumber][counterColName];
			}
			if (targetColName) {
				this.targetValue = queryData[targetRowNumber][targetColName];

				if (this.targetValue) {
					this.delta = this.counterValue - this.targetValue;
					this.trendPositive = this.delta >= 0;
				}
			} else {
				this.targetValue = null;
			}

			if (this.options.counterLabel) {
				this.counterLabel = this.options.counterLabel;
			}

			this.isNumber = isNumber(this.counterValue);
			if (this.isNumber) {
				this.stringPrefix = this.options.stringPrefix;
				this.stringSuffix = this.options.stringSuffix;

				const stringDecimal = this.options.stringDecimal;
				const stringDecChar = this.options.stringDecChar;
				const stringThouSep = this.options.stringThouSep;
				if (stringDecimal || stringDecChar || stringThouSep) {
					this.counterValue = numberFormat(this.counterValue, stringDecimal, stringDecChar, stringThouSep);
					this.isNumber = false;
				}
			} else {
				this.stringPrefix = null;
				this.stringSuffix = null;
			}
		}

		// $timeout(() => {
		// 	this.handleResize();
		// });
	}

}

function getRowNumber(index, size) {
	if (index >= 0) {
		return index - 1;
	}

	if (Math.abs(index) > size) {
		index %= size;
	}

	return size + index;
}