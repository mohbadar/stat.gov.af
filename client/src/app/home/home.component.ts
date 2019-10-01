import { Component, Input, OnInit, SimpleChange, SimpleChanges, ViewChild, ElementRef, OnChanges, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core'
import { Globals } from '../core/_helpers/globals';
import { CookieService } from 'ngx-cookie-service';
import { DatatablesService } from '../services/datatables.service';


declare var $: any;

@Component({
	selector: 'home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	private listTitles: any[];
	location: Location;
	private nativeElement: Node;
	private toggleButton;
	private sidebarVisible: boolean;
	languageBadge;
	selectEnvironment;

	availLangs = [
		{ name: 'English', value: 'en', dir: 'ltr' },
		{ name: 'پښتو', value: 'ps', dir: 'rtl' },
		{ name: 'دری', value: 'dr', dir: 'rtl' }
	];

	currentDate = new Date();
	constructor(private translate: TranslateService,
		public globals: Globals,
		private cookieService: CookieService,
		private datatablesService: DatatablesService) {
		console.log("Home Component");
	}

	get dashboardCount() {
		if(this.globals.dashboardList && this.globals.dashboardList.length > 0) {
			return this.globals.dashboardList.length;
		} else {
			return 0;
		}
	}

	get widgetCount() {
		if(this.globals.dashboardList && this.globals.dashboardList.length > 0) {
			return this.globals.dashboardList.length;
		} else {
			return 0;
		}
	}

	getCurrentEnvironment() {
		if (this.globals.principal) {
			for (let envObj of this.globals.principal.environments) {
				if (envObj['slug'] == this.globals.principal.selectedEnv) {
					return envObj;
				}
			}
		}

	}

	ngOnInit() {
		// counter
		$('.counter-count').each(function () {
			$(this).prop('Counter', 0).animate({
				Counter: $(this).text()
			}, {
				duration: 10000,
				easing: 'swing',
				step: function (now) {
					$(this).text(Math.ceil(now));
				}
			});


		});

		this.selectEnvironment = this.getCurrentEnvironment();

		this.setupLanguage();

		this.translate.onLangChange.subscribe((event) => {
			console.log('Change language called');
			const selectedLang = event.lang;
			if (selectedLang !== 'en') {
				$('.feature-back').addClass("text-right");
				$('.feature-back').css("text-align","right");
			}
			else{
				$('.feature-back').removeClass("text-right");
				$('.feature-back').css("text-align","left");
			}
			this.languageBadge = selectedLang;

			this.datatablesService.callServiceCmpMethod(selectedLang);
			// this.navbarRTL(selectedLang);
		});


		$(document).ready(function() {
			$('#media').carousel({
			  pause: true,
			  interval: false,
			});
		});
	}

	ngAfterViewInit() {
		
	}

	private setupLanguage() {
		this.translate.addLangs(['en', 'ps', 'dr']);

		let browserLang = this.cookieService.get('lang');
		if (browserLang) {
			this.globals.lang = browserLang;
		} else {
			this.cookieService.set('lang', this.globals.lang);
			browserLang = this.globals.lang;
		}

		this.languageBadge = browserLang;
		this.translate.use(browserLang.match(/en|ps|dr/) ? browserLang : 'en');
	}

	getTitleByLang(title) {
		try {
			let titleObj = JSON.parse(title);
			if(titleObj instanceof Object) {

				return titleObj[localStorage.getItem('lang')];
			}
			return title;
		} catch(e) {
			return title;
		}
	}

}



