import { Component, Input, OnInit, SimpleChange, SimpleChanges, ViewChild, ElementRef, OnChanges, AfterViewInit } from '@angular/core';

declare var $: any;

@Component({
	selector: 'home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	
	constructor() { 
		console.log("Home Component");
	}

	ngOnInit() {
		$('.carousel').carousel({
			interval: 3000
		});
	}
}
