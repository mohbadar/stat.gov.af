import { Component, OnInit, ViewContainerRef, ViewChild, Input, AfterViewInit, ComponentFactoryResolver } from '@angular/core';

@Component({
  selector: 'dynamic-table-row',
  template: '<div [innerHTML]="render"></div>'
})
export class DynamicTableRowComponent implements OnInit, AfterViewInit {
	@Input() row: any;
	@Input() columns: any;
	@Input() render: any;
	// @ViewChild("rowTemplate") rowTemplateContainer: ViewContainerRef;

	constructor(private resolver: ComponentFactoryResolver) { }
	
	ngOnInit() {
	}

	ngAfterViewInit() {
	}

	

}
