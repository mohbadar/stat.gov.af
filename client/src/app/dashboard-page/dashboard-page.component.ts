import { Component, Input } from '@angular/core';
import { Dashboard } from '../models/dashboard';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'dashboard-page',
	templateUrl: './dashboard-page.component.html',
	styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent {
	dashboard_slug = 'redash_postgresql';

	constructor(private route: ActivatedRoute) { }

	ngOnInit() {
		this.route.paramMap.subscribe(params => {
			this.dashboard_slug = params.get("slug");
		});
	}

	renderDashboard() {

	}
}
