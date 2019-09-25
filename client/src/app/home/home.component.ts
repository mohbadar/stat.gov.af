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
		// counter
		$('.counter-count').each(function () {
			$(this).prop('Counter',0).animate({
				Counter: $(this).text()
			}, {
				duration: 5000,
				easing: 'swing',
				step: function (now) {
					$(this).text(Math.ceil(now));
				}
			});
		});


	}

	
}



