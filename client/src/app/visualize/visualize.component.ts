import { Component, Input, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import * as _ from 'lodash';
import { Globals } from './../core/_helpers';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'visualize',
	templateUrl: './visualize.component.html',
	styleUrls: ['./visualize.component.scss']
})
export class VisualizeComponent implements OnInit {
	@Input() source_data: any = [
		[],
		[],
		[]
	];

	constructor(public translate: TranslateService,
		public globals: Globals) {
	}

	ngOnInit() {
		
	}

	ngAfterViewInit() {
		
	}

}