import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Widget } from '../models/widget';
import { WidgetComponent } from '../core';

@Component({
  selector: 'app-widget-page',
  templateUrl: './widget-page.component.html',
  styleUrls: ['./widget-page.component.scss']
})
export class WidgetPageComponent implements OnInit {
	widget_id;
	widget: Widget;
	constructor(private route: ActivatedRoute) { }

	ngOnInit() {
		this.route.paramMap.subscribe(params => {
			this.widget_id = params.get("slug");
		});

		this.widget = WidgetComponent.getWidget(this.widget_id);

		console.log(this.widget);
	}

}
