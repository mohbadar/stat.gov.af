import { Component, EventEmitter, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { NotificationService } from './notification.service';
import { TranslateService } from '@ngx-translate/core';
import { NgZone } from '@angular/core';
import { Globals } from './../helpers/globals';
import { CookieService } from 'ngx-cookie-service';

import {
	PerfectScrollbarConfigInterface,
	PerfectScrollbarDirective
} from 'ngx-perfect-scrollbar';

const SMALL_WIDTH_BREAKPOINT = 960;

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	providers: [NotificationService]
})
export class HeaderComponent {
	@Output()
	toggleSidenav = new EventEmitter<void>();
	@Output()
	messageEvent = new EventEmitter<Object>();
	@Output()
	toggleFullscreen = new EventEmitter<void>();

	public config: PerfectScrollbarConfigInterface = {};

	availLangs = [
		{ name: 'Pashto', value: 'ps', dir: 'rtl' },
		{ name: 'Dari', value: 'dr', dir: 'rtl' },
		{ name: 'English', value: 'en', dir: 'ltr' }
	];

	private mediaMatcher: MediaQueryList = matchMedia(
		`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`
	);

	constructor(
		public notificationService: NotificationService,
		iconRegistry: MatIconRegistry,
		sanitizer: DomSanitizer,
		public translate: TranslateService,
		zone: NgZone,
		private globals: Globals,
		private cookieService: CookieService
	) {
		iconRegistry.addSvgIcon(
			'search-icon',
			sanitizer.bypassSecurityTrustResourceUrl('assets/images/search.svg')
		);

		translate.addLangs(["en", "ps", "dr"]);
		translate.setDefaultLang('en');

		let browserLang = this.cookieService.get('lang');
		if (browserLang) {
			this.globals.lang = browserLang;
			this.globals.options.dir = this.cookieService.get('dir');
		} else {
			this.cookieService.set('lang', this.globals.lang);
			this.cookieService.set('dir', this.globals.options.dir);
			browserLang = this.globals.lang;
		}

		// const browserLang: string = translate.getBrowserLang();
		translate.use(browserLang.match(/en|ps|dr/) ? browserLang : 'en');
		this.sendMessage();
		// this.mediaMatcher.addListener(mql =>
		// 	zone.run(() => {
		// 		this.mediaMatcher = mql;
		// 	})
		// );
	}

	changeLanguage(selectedVal) {
		for (let lang of this.availLangs) {
			if (selectedVal == lang.value) {
				this.globals.options.dir = lang.dir;
				this.globals.lang = lang.value;
				this.cookieService.set('lang', this.globals.lang);
				this.cookieService.set('dir', this.globals.options.dir);
			}
		}

		this.translate.use(this.globals.lang);
		this.sendMessage();
	}

	switchFullscreen() {
		this.toggleFullscreen.emit();
	}

	sendMessage() {
		this.messageEvent.emit(this.globals.options);
	}
}
