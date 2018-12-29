import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { Dashboard } from "../../../models/dashboard";
import { Widget } from "../../../models/widget";
import { QueryService } from '../../../core/helpers/query.service';
import * as _ from "lodash";
import { QueryResult } from '../../../models/query-result';
import { ShareService  } from '@ngx-share/core';
import { Visualization } from '../../../models/visualization';
import { DashboardService } from '../../helpers';

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
  
	constructor(private dashboardService: DashboardService, public share: ShareService) {
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
		
		this.share.config.url = location.origin + '/widgets/' + this.widget.id;

		this.renderWidget(false);
	}

	ngAfterViewInit() {
		if(this.widget.$dashboardComponent) {
			this.widget.$dashboardComponent.addWidget(this.widget);
		}
	}

	static getWidget(widgetId) {
		if(widgetId) {
			DashboardService.getWidget(widgetId).subscribe((data) => {
				 
				// this.widgets.push(_.create(Widget.prototype, widget));
				let newWidget = new Widget(data);
				
				if (newWidget.visualization) {
					let newVisualization = new Visualization(newWidget.visualization);
					newWidget.visualization = newVisualization;
				}

				// this.items[newWidget.id] = newWidget.options.position;

				newWidget.$dashboardComponent = this;
				
				return newWidget;
			});
		}
		return  new Widget({});
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
