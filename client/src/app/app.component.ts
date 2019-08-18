import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
declare var $: any;
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

	constructor(translate: TranslateService) {
		translate.addLangs(['en', 'ps', 'dr']);
		translate.setDefaultLang('en');

		const browserLang: string = translate.getBrowserLang();
		translate.use(browserLang.match(/en|ps|dr/) ? browserLang : 'en');
	}

	ngOnInit() {
		$(window).scroll(function () {
			if ($(window).scrollTop() > 100) {
				console.log('greater the hundred');
				
				$('#scroll').fadeIn();
			} else {
				$('#scroll').fadeOut();
			}
		});

		$(document).on('click', '#scroll', () => {
			console.log('clicked');
			$('html, body').animate({ scrollTop: 0 }, 600);
			return false;
		});
	}
}



