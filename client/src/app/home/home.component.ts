import { Component, Input, OnInit, SimpleChange, SimpleChanges, ViewChild, ElementRef, OnChanges, AfterViewInit } from '@angular/core';

@Component({
	selector: 'home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent {
	
	constructor() { 
		console.log("Home Component");
	}

	
}
