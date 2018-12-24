import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { Dashboard } from "../models/dashboard";
import { DashboardService } from '../core/helpers/dashboard.service';
import { Router } from '@angular/router';
import { Globals } from './../core/helpers/globals';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	dashboard_slug = '';

	constructor(public dashboardService: DashboardService, public globals: Globals) {
		
	}

	ngOnInit() {
		this.dashboard_slug = this.globals.default_dashboard;
	}

	renderDashboard() {
			
	}
}
