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
		private globals: Globals,
		private cookieService: CookieService,
		private datatablesService: DatatablesService) {
		console.log("Home Component");
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

			this.languageBadge = selectedLang;

			this.datatablesService.callServiceCmpMethod(selectedLang);
			// this.navbarRTL(selectedLang);
		});
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


}



