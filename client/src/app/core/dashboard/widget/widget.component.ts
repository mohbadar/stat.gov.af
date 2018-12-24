import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Dashboard } from "../../../models/dashboard";
import { Widget } from "../../../models/widget";
import { QueryService } from '../../../core/helpers/query.service';
import * as _ from "lodash";
import { QueryResult } from '../../../models/query-result';

@Component({
  selector: 'dashboard-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit {
  @Input() widget: Widget;
	@Input() widgetId;
	@ViewChild('widgetContainer') widgetContainer: ElementRef;
  type: string = '';
  queryResult: QueryResult;
  
  constructor(public queryService: QueryService) {
  }

	ngOnInit() {
		// this.widget = _.create(Widget.prototype, this.widget);
		if (this.widget['visualization']) {
			this.type = 'visualization';
		} else if (this.widget['restricted']) {
			this.type = 'restricted';
		} else {
			this.type = 'textbox';
		}
		this.widget.$widgetContainer = this.widgetContainer;
		
		this.renderWidget(false);
	}

	ngAfterViewInit() {
		this.widget.$dashboardComponent.addWidget(this.widget);
		
	}

	renderWidget(force = false) {
		if (force != true && this.widget.getQueryResult()) {
			this.widget.getQueryResult().getById(this.widget.visualization.query.latest_query_data_id);
		}
	}

	reloadWidget() {
		this.renderWidget(false);
	}

	referesh() {

	}
}
