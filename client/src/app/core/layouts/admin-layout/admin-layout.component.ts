import {
	Component,
	ElementRef,
	NgZone,
	OnInit,
	OnDestroy,
	ViewChild
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, Route, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { LoadingBarService } from '@ngx-loading-bar/core';
import { Globals } from '../../helpers/globals';

import {
	PerfectScrollbarConfigInterface,
	PerfectScrollbarDirective
} from 'ngx-perfect-scrollbar';

const SMALL_WIDTH_BREAKPOINT = 960;

@Component({
	selector: 'app-admin',
	templateUrl: './admin-layout.component.html'
})
export class AdminLayoutComponent implements OnInit, OnDestroy {
	private _router: Subscription;
	public mediaMatcher: MediaQueryList = matchMedia(
		`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`
	);

	url: string;
	sidePanelOpened;
	routeData: any;

	// @ViewChild('sidemenu', { static: false })
	// sidemenu;
	// @ViewChild(PerfectScrollbarDirective, { static: false })
	// directiveScroll: PerfectScrollbarDirective;

	// public config: PerfectScrollbarConfigInterface = {};

	constructor(
		private _element: ElementRef,
		private router: Router,
		private route: ActivatedRoute,
		public zone: NgZone,
		public loader: LoadingBarService,
		private titleService: Title,
		public globals: Globals
	) {
		// this.mediaMatcher.addListener(mql =>
		// 	zone.run(() => {
		// 		this.mediaMatcher = mql;
		// 	})
		// );
	}

	ngOnInit(): void {
		this.url = this.router.url;

		// this._router = this.router.events
		// 	.pipe(filter(event => event instanceof NavigationEnd))
		// 	.subscribe((event: NavigationEnd) => {
		// 		document.querySelector(
		// 			'.app-inner > .mat-drawer-content > div'
		// 		).scrollTop = 0;
		// 		this.url = event.url;
		// 		this.runOnRouteChange();
		// 	});
		// this.runOnRouteChange();

		// this.printpath('', this.router.config);
	}

	printpath(parent: String, config: Route[]) {
		for (let i = 0; i < config.length; i++) {
			let r = config[i];
			if (r.children && r.path) {
				this.printpath(parent + '/' + r.path, r.children);
			}
		}
	}

	ngOnDestroy(): void {
		this._router.unsubscribe();
	}

	// runOnRouteChange(): void {
	// 	if (this.isOver()) {
	// 		this.sidemenu.close();
	// 	} else {
	// 		this.updatePS();
	// 	}

	// 	this.route.children.forEach((route: ActivatedRoute) => {
	// 		let activeRoute: ActivatedRoute = route;
	// 		while (activeRoute.firstChild) {
	// 			activeRoute = activeRoute.firstChild;
	// 		}
	// 		this.routeData = activeRoute.snapshot.data;
	// 	});

	// 	if (this.routeData.hasOwnProperty('heading')) {
	// 		this.setTitle(this.routeData.heading);
	// 	}
	// }

	setTitle(newTitle: string) {
		this.titleService.setTitle(
			newTitle + ' | Stat.Gov.af'
		);
	}

	receiveMessage($event): void {
		this.globals.options = $event;
		this.triggerWindowResize();
	}

	// toggleSidenav(): void {
	// 	this.sidemenu.toggle();
	// 	this.triggerWindowResize();
	// }

	isOver(): boolean {
		if (
			this.url === '/messages' ||
			this.url === '/calendar' ||
			this.url === '/media' ||
			this.url === '/maps/leaflet' ||
			this.url === '/taskboard'
		) {
			return true;
		} else {
			return this.mediaMatcher.matches;
		}
	}

	// updatePS(): void {
	// 	if (!this.mediaMatcher.matches) {
	// 		setTimeout(() => {
	// 			this.directiveScroll.update();
	// 		}, 350);
	// 	}
	// }

	triggerWindowResize() {
		if (typeof Event === 'function') {
			window.dispatchEvent(new Event('resize'));
		} else {
			const evt = window.document.createEvent('UIEvents');
			evt.initUIEvent('resize', true, false, window, 0);
			window.dispatchEvent(evt);
		}
	}

	toggleFullscreen(): void {
		// const elem = this._element.nativeElement.querySelector('.app-inner');
		const elem = this._element.nativeElement.querySelector('.app');
		if (elem.requestFullscreen) {
			elem.requestFullscreen();
		} else if (elem.webkitRequestFullScreen) {
			elem.webkitRequestFullScreen();
		} else if (elem.mozRequestFullScreen) {
			elem.mozRequestFullScreen();
		} else if (elem.msRequestFullScreen) {
			elem.msRequestFullScreen();
		}
	}
}
