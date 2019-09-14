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
	@Input() source_columns: any = ["id", "name", "sex"];
	@Input() source_data: any = [
		[1, "Ahmad", "M"],
		[1, "Daud", "M"],
		[1, "Sara", "F"]
	];

	visualizationTypes = [
		{id: "chart", name: "CHART"}
	];
	chartTypes = [
		{id: "chart", name: "CHART"},
		{id: "pie", name: "PIE"},
		{id: "line_chart", name: "LINE_CHART"}
	];

	constructor(public translate: TranslateService,
		public globals: Globals) {
	}

	ngOnInit() {
		
	}

	ngAfterViewInit() {
		
	}

}