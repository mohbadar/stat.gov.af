import { Injectable } from '@angular/core';
import { HttpClient, HttpXhrBackend } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Dashboard } from '../../models/dashboard';
import * as _ from 'lodash';
import { Subject } from 'rxjs';

const staticHttpClient = new HttpClient(new HttpXhrBackend({ build: () => new XMLHttpRequest() }));
const statucBaseUrl = 'api/public';

@Injectable({ providedIn: 'root' })
export class DashboardService {
	private baseUrl = 'api/public';

	callToDashboardMethodSource = new Subject<any>();

	static getWidget(id) {
		const params = new HttpParams().set('id', id);
		return staticHttpClient.get<Dashboard>(`${statucBaseUrl}/widgets/` + id);
	}
	constructor(private httpClient: HttpClient) { }

	callDefaultMethod() {
		this.callToDashboardMethodSource.next();
	}

	getAll() {
		const response = this.httpClient.get<Array<any>>(`${this.baseUrl}/dashboards`);
		return response;
	}

	getDashboard(slug) {
		const params = new HttpParams().set('slug', slug);
		return this.httpClient.get<Dashboard>(`${this.baseUrl}/dashboards/` + slug);
	}

	getDefaultDashboard() {
		const response = this.httpClient.get(`${this.baseUrl}/dashboards/default`);
		return response;
	}
}


export function prepareWidgetsForDashboard(widgets) {
	// Default height for auto-height widgets.
	// Compute biggest widget size and choose between it and some magic number.
	// This value should be big enough so auto-height widgets will not overlap other ones.
	const defaultWidgetSizeY =
		Math.max(
			_
				.chain(widgets)
				.map(w => w.options.position.sizeY)
				.max()
				.value(),
			20,
		) + 5;
	// Fix layout:
	// 1. sort and group widgets by row
	// 2. update position of widgets in each row - place it right below
	//    biggest widget from previous row
	_.chain(widgets)
		.sortBy(widget => widget.options.position.row)
		.groupBy(widget => widget.options.position.row)
		.reduce((row, widgetsAtRow) => {
			let height = 1;
			_.each(widgetsAtRow, (widget) => {
				height = Math.max(
					height,
					widget.options.position.autoHeight ? defaultWidgetSizeY : widget.options.position.sizeY,
				);
				widget.options.position.row = row;
				if (widget.options.position.sizeY < 1) {
					widget.options.position.sizeY = defaultWidgetSizeY;
				}
			});
			return row + height;
		}, 0)
		.value();

	// Sort widgets by updated column and row value
	widgets = _.sortBy(widgets, widget => widget.options.position.col);
	widgets = _.sortBy(widgets, widget => widget.options.position.row);

	return widgets;
}