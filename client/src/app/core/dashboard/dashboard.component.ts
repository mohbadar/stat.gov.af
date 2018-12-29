import { Component, Input, OnInit, SimpleChange, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { Dashboard, dashboardGridOptions } from "../../models/dashboard";
import { Widget } from "../../models/widget";
import { DashboardService, prepareWidgetsForDashboard } from "../helpers/dashboard.service";
import { QueryService } from '../helpers/query.service';
import * as _ from "lodash";
import { WidgetComponent } from './widget/widget.component';
import { Visualization } from '../../models/visualization';
import { debounce } from 'lodash';
import { GridStackOptions, GridStackComponent } from 'ng4-gridstack';
import { Globals } from './../helpers/globals';

@Component({
  selector: 'dashboard',
  inputs: ['slug'],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
	@Input() slug: string = '';
	title = '';
	widgets: Widget[] = [];
	items = {};
	handleResize;
	calculatedMaxRows = 0;
	gridStackEl;

	@ViewChild('grid_stack') gridStack: ElementRef;
	@ViewChild('grid_stack_item') gridStackItem: ElementRef;

	area: GridStackOptions = new GridStackOptions();
  // public dashboards: Dashboard[] = [
  //   new Dashboard(1, "Dashbaord 001"),
  //   new Dashboard(2, "Product 002"),
  //   new Dashboard(3, "Product 003"),
  //   new Dashboard(4, "Product 004"),
  //   new Dashboard(5, "Product 005"),
  //   new Dashboard(6, "Product 006"),
  //   new Dashboard(7, "Product 007"),
  //   new Dashboard(8, "Product 008")
  // ];
  // product: Dashboard = this.dashboards[0];// this will store the current product to display 
  public dashboard: Dashboard = new Dashboard(null, '');

  constructor(private dashboardService: DashboardService,
	public queryService: QueryService,
	public globals: Globals) {
    
  }

  ngOnChanges(changes: SimpleChanges) {

		const slug: SimpleChange = changes.slug;
		if(!slug.isFirstChange() && changes.slug) {
        	this.getDashbaord(this.slug);
		}
	}

	ngOnInit() {
		console.log("Slug : " + this.slug);
		this.area.cellHeight = dashboardGridOptions.rowHeight - dashboardGridOptions.margins + 'px';
		this.area.verticalMargin = dashboardGridOptions.margins;
		this.area.auto = false;
		this.area.rtl = 'auto';
		this.area.disableOneColumnMode = true;
		// this.area.rtl = this.globals.options.dir;

		this.getDashbaord(this.slug);

		// this.handleResize = debounce(this.batchUpdateWidgets, 50);
		
		// this.updateGridStackAttributes(this.gridStack);
	}

	ngAfterViewInit() {
	}
	
	// updateGridStackAttributes(gridStack) {
	// 	let gridstackItems = gridStack.items;
	// 	gridstackItems._results.forEach(item => {
	// 		item.el.nativeElement
	// 	});
	// }


	setTitle(title) {
		this.title = title;
	}

	getDashbaord(slug) {
		if(slug) {
			this.dashboardService.getDashboard(slug).subscribe((data) => {
				this.dashboard = _.create(Dashboard.prototype, data);
				
				this.widgets = [];
				for (var widget of this.dashboard.widgets) {
					// this.widgets.push(_.create(Widget.prototype, widget));
					let newWidget = new Widget(widget);
					
					if (newWidget.visualization) {
						let newVisualization = new Visualization(newWidget.visualization);
						newWidget.visualization = newVisualization;
					}

					// this.items[newWidget.id] = newWidget.options.position;

					newWidget.$dashboardComponent = this;
					
					this.widgets.push(newWidget);
				}
				
				this.widgets = prepareWidgetsForDashboard(this.widgets);

				this.dashboard.widgets = this.widgets;

				let gsEL:any = this.gridStack;
				this.gridStackEl = gsEL.el.nativeElement;

				this.renderDashboard(this.dashboard);
				// this.handleResize(this.items);

				// let gridStackComponenet:any = this.gridStack;
				// let grid = gridStackComponenet.grid;
				// grid._updateStyles(this.calculatedMaxRows+1);
			});
		}
	}

	renderDashboard(dashboard) {
		this.setTitle(dashboard.name);
		this.emptyGridStack();
		// this.calculatedMaxRows = this.getMaxRows(this.widgets);
		// let gridStackComponenet:any = this.gridStack;
		// let grid = gridStackComponenet.grid;
		// grid._updateStyles(this.calculatedMaxRows+1);
	}

	emptyGridStack() {
		let gridStackComponenet:any = this.gridStack;
		gridStackComponenet.grid.grid.nodes = [];
		// gridStackComponenet.grid.destroy();
	}

	addWidget(widget) {
		let gridStackItemEl = this.gridStackEl.querySelectorAll('.grid-stack-item[id="' + widget.id + '"]')
		let gridStackComponenet:any = this.gridStack;
        let grid = gridStackComponenet.grid;
        if (grid) {
          grid.addWidget(
            gridStackItemEl,
			widget.options.position.col, widget.options.position.row,
			widget.options.position.sizeX, widget.options.position.sizeY,
            false, // auto position
			widget.options.position.minSizeX, widget.options.position.maxSizeX,
			widget.options.position.minSizeY, widget.options.position.maxSizeY,
            widget.id,
		  );
        }

	}

	getMaxRows(widgets) {
		if(!this.calculatedMaxRows) {
			let calMaxRows = 0;
			for (var widget of widgets) {
				if(calMaxRows < widget.options.position.row) {
					calMaxRows = widget.options.position.row;
				}
			}
			return calMaxRows;
		}
		return this.calculatedMaxRows;
	}

  	batchUpdateWidgets() {
		// This method is used to update multiple widgets with a single
		// reflow (for example, restore positions when dashboard editing cancelled).
		// "dirty" part of code: updating grid and DOM nodes directly.
		// layout reflow is triggered by `batchUpdate`/`commit` calls
		let gridStackComponenet:any = this.gridStack;
		let gridStackItems = gridStackComponenet.items;
		gridStackItems._results.forEach(node => {
			let nodeId = node.el.nativeElement.getAttribute("id");
			const item = this.items[nodeId];
			if (item) {
				if (_.isNumber(item.col)) {
					node.option.x = parseFloat(item.col);
					node.jWidgetRef.setAttribute('data-gs-x', node.option.x);
					node.option._dirty = true;
				}

				if (_.isNumber(item.row)) {
					node.option.y = parseFloat(item.row);
					node.jWidgetRef.setAttribute('data-gs-y', node.option.y);
					node.option._dirty = true;
				}

				if (_.isNumber(item.sizeX)) {
					node.option.width = parseFloat(item.sizeX);
					node.jWidgetRef.setAttribute('data-gs-width', node.option.width);
					node.option._dirty = true;
				}

				if (_.isNumber(item.sizeY)) {
					node.option.height = parseFloat(item.sizeY);
					node.jWidgetRef.setAttribute('data-gs-height', node.option.height);
					node.option._dirty = true;
				}

				if (_.isNumber(item.minSizeX)) {
					node.option.minWidth = parseFloat(item.minSizeX);
					node.jWidgetRef.setAttribute('data-gs-min-width', node.option.minWidth);
					node.option._dirty = true;
				}

				if (_.isNumber(item.maxSizeX)) {
					node.option.maxWidth = parseFloat(item.maxSizeX);
					node.jWidgetRef.setAttribute('data-gs-max-width', node.maxWidth);
					node.option._dirty = true;
				}

				if (_.isNumber(item.minSizeY)) {
					node.option.minHeight = parseFloat(item.minSizeY);
					node.jWidgetRef.setAttribute('data-gs-min-height', node.option.minHeight);
					node.option._dirty = true;
				}

				if (_.isNumber(item.maxSizeY)) {
					node.option.maxHeight = parseFloat(item.maxSizeY);
					node.jWidgetRef.setAttribute('data-gs-max-height', node.option.maxHeight);
					node.option._dirty = true;
				}
			}
		});

		let grid = gridStackComponenet.grid;
		// grid._updateContainerHeight();
		grid._updateStyles(this.calculatedMaxRows+1);
	}
}
