import { Component, Input, OnInit } from '@angular/core';
import { QueryResult } from '../models/query-result';
import { Visualization } from '../models/visualization';

@Component({
  selector: 'visualization-renderer',
  templateUrl: './visualization-renderer.component.html',
  styleUrls: ['./visualization-renderer.component.scss']
})
export class VisualizationRendererComponent implements OnInit {
  @Input() visualization: Visualization;
  @Input('query-result') queryResult: QueryResult;

  constructor() { 
  }

  ngOnInit() {
  }

}
