import { Component, OnInit } from '@angular/core';
import { DatasourceDashboardService } from 'app/services/datasource.dashboard.service';
import { DatasourceWidgetService } from 'app/services/datasource.widget.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-dashboard',
  templateUrl: './edit-dashboard.component.html',
  styleUrls: ['./edit-dashboard.component.scss']
})
export class EditDashboardComponent implements OnInit {
  recordId: any;
  dashboard: any; 

  constructor(
    private datasourceDashboardService: DatasourceDashboardService,
    private datasourceWidgetService: DatasourceWidgetService,
    private router: Router
  ) { }

  ngOnInit() {
    this.recordId= history.state.recordId;

    this.datasourceDashboardService.loadById(this.recordId).subscribe((data) => {
        this.dashboard =data;
        console.log("Data", data);
        
    },(err) => {

      console.log("Dashboard ID doesn't exist!");
      this.router.navigate(['/custom/my-dashboards']);

    });
    
  }

}
