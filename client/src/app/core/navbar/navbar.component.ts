import { Component, OnInit, Renderer, ViewChild, ElementRef, Directive } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { DashboardService } from '../_helpers/dashboard.service';
import { Globals } from '../_helpers/globals';
import { AuthService } from 'app/services/auth.service';
import { TranslateService } from '@ngx-translate/core';

var misc: any = {
	navbar_menu_visible: 0,
	active_collapse: true,
	disabled_collapse_init: 0,
}
declare var $: any;

@Component({
	moduleId: module.id,
	selector: 'navbar-cmp',
	templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit {
	private listTitles: any[];
	location: Location;
	private nativeElement: Node;
	private toggleButton;
	private sidebarVisible: boolean;
	public dashboardSlugs = [];
	public languageBadge;

	public availLangs = [
		{ name: 'English', value: 'en', dir: 'ltr' },
		{ name: 'پښتو', value: 'ps', dir: 'rtl' },
		{ name: 'دری', value: 'dr', dir: 'rtl' }
	];

	@ViewChild('navbar-cmp', { static: false }) button;

	constructor(
		location: Location,
		private renderer: Renderer,
		private element: ElementRef,
		private dashboardService: DashboardService,
		private globals: Globals,
		public authService: AuthService,
		private router: Router,
		public translate: TranslateService
	) {
		this.location = location;
		this.nativeElement = element.nativeElement;
		this.sidebarVisible = false;
	}

	ngOnInit() {
		console.log('Navbar method called');
		if (localStorage.getItem('lang')) {

			this.translate.defaultLang = localStorage.getItem('lang');
			this.languageBadge = localStorage.getItem('lang');
			console.log('Done');
		} else {
			this.translate.defaultLang = 'en';
			this.languageBadge = 'en';
		}
		this.fetchAllDashboards();

		this.listTitles = ROUTES.filter(listTitle => listTitle);

		const navbar: HTMLElement = this.element.nativeElement;
		this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
		if ($('body').hasClass('sidebar-mini')) {
			misc.sidebar_mini_active = true;
		}

		// translator listener
		this.translate.onLangChange.subscribe((event) => {
			// Save the language into localstorage for future reference
			console.log('Listener called: ', event.lang);
			localStorage.setItem('lang', event.lang);
			if (event.lang !== 'en') {
				$('body').addClass('rtl');
			} else {
				$('body').removeClass('rtl');
			}
			this.languageBadge = event.lang;
		});


		$('#minimizeSidebar').click(function () {
			const $btn = $(this);

			if (misc.sidebar_mini_active == true) {
				$('body').removeClass('sidebar-mini');
				misc.sidebar_mini_active = false;

			} else {
				setTimeout(function () {
					$('body').addClass('sidebar-mini');

					misc.sidebar_mini_active = true;
				}, 300);
			}

			// we simulate the window Resize so the charts will get updated in realtime.
			const simulateWindowResize = setInterval(function () {
				window.dispatchEvent(new Event('resize'));
			}, 180);

			// we stop the simulation of Window Resize after the animations are completed
			setTimeout(function () {
				clearInterval(simulateWindowResize);
			}, 1000);

		});
	}

	fetchAllDashboards() {
		this.dashboardService.getAll().subscribe(data => {
			console.log('data : ', data);
			if (data) {
				this.globals.dashboardList = data['results'];
				data['results'].forEach(item => {
					if (item.is_default) {
						this.globals.default_dashboard = item.slug;
						this.dashboardService.callDefaultMethod();
					}

					if (item.slug !== 'home') {
						this.dashboardSlugs.push(item.slug);
					}

					// if (item.tags.indexOf(tag) != -1) {
					// 	menuItem.children.push({ state: item.slug, name: item.name });
					// }
				});

				console.log('Slugs are: ', this.dashboardSlugs);
			}
		});

	}



	isMobileMenu() {
		if ($(window).width() < 991) {
			return false;
		}
		return true;
	}

	sidebarOpen() {
		var toggleButton = this.toggleButton;
		var body = document.getElementsByTagName('body')[0];
		setTimeout(function () {
			toggleButton.classList.add('toggled');
		}, 500);
		body.classList.add('nav-open');
		this.sidebarVisible = true;
	}
	sidebarClose() {
		var body = document.getElementsByTagName('body')[0];
		this.toggleButton.classList.remove('toggled');
		this.sidebarVisible = false;
		body.classList.remove('nav-open');
	}
	sidebarToggle() {
		if (this.sidebarVisible == false) {
			this.sidebarOpen();
		} else {
			this.sidebarClose();
		}
	}

	changeLanguage(lang) {
		console.log('Language is: ', lang);
		this.translate.use(lang);
	}

	getTitle() {
		// var titlee = this.location.prepareExternalUrl(this.location.path());
		// if (titlee.charAt(0) === '#') {
		// 	titlee = titlee.slice(1);
		// }
		// for (let i = 0; i < this.listTitles.length; i++) {
		// 	if (this.listTitles[i].type === 'link' && this.listTitles[i].path === titlee) {
		// 		return this.listTitles[i].title;
		// 	} else if (this.listTitles[i].type === 'sub') {
		// 		for (let j = 0; j < this.listTitles[i].children.length; j++) {
		// 			let subtitle = this.listTitles[i].path + '/' + this.listTitles[i].children[j].path;
		// 			// console.log(subtitle)
		// 			// console.log(titlee)
		// 			if (subtitle === titlee) {
		// 				return this.listTitles[i].children[j].title;
		// 			}
		// 		}
		// 	}
		// }
		return 'Dashboard';
	}

	getPath() {
		// console.log(this.location);
		return this.location.prepareExternalUrl(this.location.path());
	}

	logout() {
		if (this.authService.logout()) {
			// TODO: direct to a public dashboard or something I dont know
			this.router.navigateByUrl('/qw', { skipLocationChange: true }).then(() =>
				this.router.navigate(['dashboard']));
		}
	}
}
