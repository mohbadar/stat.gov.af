import { Component, OnInit, Input, ViewChild, ElementRef, SimpleChanges, SimpleChange, HostListener } from '@angular/core';
import { QueryResult } from '../../../models/query-result';
import { debounce } from 'lodash';
import Sunburst from './../../lib/sunburst';

@Component({
	selector: 'sunburst-sequence-renderer',
	templateUrl: './sunburst-sequence-renderer.component.html',
	styleUrls: ['./sunburst-sequence-renderer.component.scss']
})
export class SunburstSequenceRendererComponent implements OnInit {
	@Input('options') options: any;
	@Input('query-result') queryResult: QueryResult;

	@ViewChild('sunburstSequenceContainer', { static: false }) sunburstSequenceContainer: ElementRef;
	sunburstSequenceElement;
	container;
	sunburst;
	handleResize;

	constructor() { }

	ngOnChanges(changes: SimpleChanges) {

		const options: SimpleChange = changes.options;
		if (!options.isFirstChange() && changes.options) {
			this.resize();
		}
	}

	ngOnInit() {
		this.sunburstSequenceElement = this.sunburstSequenceContainer;
		this.sunburstSequenceElement = this.sunburstSequenceElement.nativeElement;
		// this.container = this.sunburstSequenceElement.querySelector('.sunburst-visualization-container');
		this.container = this.sunburstSequenceElement;
		this.handleResize = debounce(this.resize, 50);
		this.sunburst = new Sunburst(this, this.container);

		this.handleResize();
	}

	@HostListener('window:resize', ['$event'])
	onResize(event) {
		this.handleResize();
	}

	resize() {
		this.sunburst.remove();
		this.sunburst = new Sunburst(this, this.container);
	}

}
