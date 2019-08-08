import { Component, Input, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { APP_BASE_HREF } from '@angular/common';
import { Dashboard } from '../../../models/dashboard';
import { Widget } from '../../../models/widget';
import { QueryService } from '../../../core/helpers/query.service';
import * as _ from 'lodash';
import { QueryResult } from '../../../models/query-result';
import { ShareService } from '@ngx-share/core';
import { Visualization } from '../../../models/visualization';
import { DashboardService, Globals } from '../../helpers';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'dashboard-widget',
	templateUrl: './widget.component.html',
	styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit {
	@Input() widget: Widget;
	@Input() widgetId;
	@ViewChild('widgetContainer', { static: false }) widgetContainer: ElementRef;
	type: string = '';
	queryResult: QueryResult;
	widgetURL;

	// isStandalone parameter specify whether a single widget is rendered or list of widgets are rendered
	static getWidget(widgetId, isStandalone, callback) {
		if (widgetId) {
			DashboardService.getWidget(widgetId).subscribe((data) => {

				// this.widgets.push(_.create(Widget.prototype, widget));
				let newWidget = new Widget(data);
				newWidget.isStandalone = isStandalone;

				if (newWidget.visualization) {
					let newVisualization = new Visualization(newWidget.visualization);
					newWidget.visualization = newVisualization;

					newWidget.getQueryResult(true).getById(newWidget.visualization.query.latest_query_data_id);
				}

				// this.items[newWidget.id] = newWidget.options.position;
				newWidget.$dashboardComponent = this;

				// return newWidget;
				return callback(newWidget)
			});
		}
	}

	constructor(private dashboardService: DashboardService, public share: ShareService,
		private bottomSheet: MatBottomSheet,
		public translate: TranslateService,
		public globals: Globals) {
	}

	ngOnInit() {
		// this.widget = _.create(Widget.prototype, this.widget);
		if (this.widget['visualization']) {
			this.type = 'visualization';
		} else if (this.widget['restricted']) {
			this.type = 'restricted';
		} else {
			this.type = 'textbox';
			this.widget.$parsedText = this.parseText(this.widget.text);
		}
		this.widget.$widgetContainer = this.widgetContainer;
		this.widgetURL = location.origin + '/widgets/' + this.widget.id;
		this.share.config.url = this.widgetURL;

		this.renderWidget(false);
	}

	ngAfterViewInit() {
		if (_.isFunction(this.widget.$dashboardComponent.addWidget)) {
			this.widget.$dashboardComponent.addWidget(this.widget);
		}
	}

	openBottomSheet(): void {
		let iframeText = '<iframe src="' + this.widgetURL + '" width="720" height="391"></iframe>';
		this.bottomSheet.open(IFrameBottomSheet, {
			data: { iframe: iframeText },
		});
	}

	renderWidget(force = false) {
		if (force != true && this.widget.getQueryResult()) {
			this.widget.getQueryResult().getById(this.widget.visualization.query.latest_query_data_id);
		}
	}

	getWidgetTitle() {
		if (this.widget.visualization) {
			return this.parseTitleAsObject(this.widget.visualization.name);
		}
		return this.parseTitleAsObject(this.widget.getQuery().name);
	}

	getWidgetDescription() {
		return this.parseTitleAsObject(this.widget.getQuery().description);
	}

	parseTitleAsObject(title) {
		try {
			let titleObj = JSON.parse(title);
			if (titleObj instanceof Object) {
				return titleObj[this.globals.lang];
			}
			return title;
		} catch (e) {
			return title;
		}
	}

	reloadWidget() {
		this.renderWidget(false);
	}

	parseText(text: string) {
		var re = new RegExp("<script(.*?)</script>");

		if (text.indexOf('<script') != -1) {
			var script = re.exec(text);
			if (script) {
				this.addScript(script[0]);
				text = text.replace(script[0], '');
			}
		}
		return text;
	}

	addScript(text: string) {
		var jsContent = text;

		var startScriptTag = new RegExp("<script(.*?)>");
		var resultArray = startScriptTag.exec(jsContent);
		if (resultArray) {
			jsContent = jsContent.replace(resultArray[0], '');
		}

		var endScriptTag = new RegExp("</script>");
		resultArray = endScriptTag.exec(jsContent);
		if (resultArray) {
			jsContent = jsContent.replace(resultArray[0], '');
		}

		var scriptTag = document.createElement("script");
		scriptTag.type = "text/javascript";

		scriptTag.innerHTML = jsContent;
		document.body.appendChild(scriptTag);
	}

	referesh() {

	}
}

@Component({
	selector: 'iframe-bottomsheet',
	templateUrl: 'iframe-bottomsheet.html',
})
export class IFrameBottomSheet {
	constructor(private bottomSheetRef: MatBottomSheetRef<IFrameBottomSheet>, @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) { }

}
