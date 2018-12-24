import { Component, OnInit } from '@angular/core';
import { Dashboard } from "../models/dashboard";

@Component({
  selector: 'app-dashboard-list',
  templateUrl: './dashboard-list.component.html',
  styleUrls: ['./dashboard-list.component.scss']
})
export class DashboardListComponent implements OnInit {

  public products: Dashboard[] = [
    new Dashboard(1, "Product 001"),
    new Dashboard(2, "Product 002"),
    new Dashboard(3, "Product 003"),
    new Dashboard(4, "Product 004"),
    new Dashboard(5, "Product 005"),
    new Dashboard(6, "Product 006"),
    new Dashboard(7, "Product 007"),
    new Dashboard(8, "Product 008")
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
