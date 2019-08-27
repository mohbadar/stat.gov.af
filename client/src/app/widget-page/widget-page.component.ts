import { Component, OnInit, SimpleChanges, SimpleChange } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Widget } from '../models/widget';
import { WidgetComponent } from './../dashboard/widget/widget.component';
import { Globals } from '../core/_helpers/globals';

@Component({
	selector: 'widget-page',
	templateUrl: './widget-page.component.html',
	styleUrls: ['./widget-page.component.scss']
})
export class WidgetPageComponent implements OnInit {
	widget_id;
	widget: Widget = new Widget({});
	is_loaded: boolean = false;
	constructor(private route: ActivatedRoute, public globals: Globals) {
		this.route.paramMap.subscribe(params => {
			this.widget_id = params.get("slug");
		});

	}

	ngOnChanges(changes: SimpleChanges) {
		const widget: SimpleChange = changes.widget;
		if (!widget.isFirstChange() && changes.widget) {
			this.renderWidget();
		}
	}

	ngOnInit() {
		WidgetComponent.getWidget(this.widget_id, true, (widget) => {
			this.widget = widget;
			this.is_loaded = true;
		});
		this.renderWidget();
	}

	renderWidget() {
		// console.log(this.widget.getQueryResult());
		// this.widget.getQueryResult(true).getById(this.widget.visualization.query.latest_query_data_id);
		// console.log(this.widget);
	}

}
