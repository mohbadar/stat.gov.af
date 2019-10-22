import { Component, OnInit, ViewChildren, QueryList, ViewChild, ChangeDetectorRef, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';

declare var $: any;
import { GridStackItem, GridStackOptions, GridStackItemComponent, GridStackComponent } from 'ng4-gridstack'
import { Dashboard, dashboardGridOptions } from '../../../models/dashboard';
import { Globals } from 'app/core';
import { AuthService } from 'app/services/auth.service';
import { DatasourceWidgetService } from 'app/services/datasource.widget.service';
import { DatasourceDashboard } from 'app/models/datasource.dashboard';
import { DatasourceDashboardService } from 'app/services/datasource.dashboard.service';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';


// import 'jquery-ui/ui/widgets/draggable';
// import 'jquery-ui/ui/widgets/droppable';
// import 'jquery-ui/ui/widgets/resizable';

@Component({
	selector: 'app-public-dashboard',
	templateUrl: './public-dashboard.component.html',
	styleUrls: ['./public-dashboard.component.scss']
})
export class PublicDashboardComponent implements OnInit {


	// @ViewChildren(GridStackItemComponent) items: QueryList<GridStackItemComponent>;
	// @ViewChild('gridStackMain', { static: false }) gridStackMain: ElementRef;
	// area: GridStackOptions = new GridStackOptions();
	// widgets: GridStackItem[] = [];

	options;
	gridStackEl;
	// tslint:disable-next-line: max-line-length
	charts: any;
	registerForm: FormGroup;
	passwordMatch;
	dashboardName;
	loginForm: FormGroup;
	isLoading: boolean;
	widgetIds;
	constructor(
		private cd: ChangeDetectorRef,
		public globals: Globals,
		private fb: FormBuilder,
		public authService: AuthService,
		public widgetService: DatasourceWidgetService,
		public datasourceDashboardService: DatasourceDashboardService,
		private translate: TranslateService,
	) { }

	ngOnInit() {
		console.log(this.charts);
		this.charts = [];
		this.dashboardName = '';
		// this.area.cellHeight = dashboardGridOptions.rowHeight - dashboardGridOptions.margins + 'px';
		// this.area.verticalMargin = dashboardGridOptions.margins;
		// this.area.auto = false;
		// this.area.rtl = 'auto';
		// this.area.disableOneColumnMode = true;

		// const gsEL: any = this.gridStackMain;
		// this.gridStackEl = gsEL.el.nativeElement;
		this.fetchDataFromLocalStorage();

		this.initializeRegistrationForm();
		this.initializeLoginForm();



	}

	changeTab(vl) {
		$('a[href="#' + vl + '"]').tab('show');
	}


	checkPasswords(group: FormGroup) { // here we have the 'passwords' group
		const pass = group.controls.password.value;
		const confirmPass = group.controls.passwordConf.value;

		return pass === confirmPass ? null : { notSame: true }
	}

	checkPassword(pass, confPass) {
		if (pass !== confPass) {
			this.passwordMatch = false;
		} else {
			this.passwordMatch = true;
		}
	}

	initializeRegistrationForm() {
		this.registerForm = this.fb.group({
			fullName: ['', Validators.required],
			username: ['', Validators.required],
			mobileNumber: ['', Validators.required],
			email: ['', [Validators.required, Validators.email]],
			password: ['', Validators.required],
			passwordConf: ['', Validators.required]
		}, { validators: this.checkPasswords });

	}

	initializeLoginForm() {
		this.loginForm = this.fb.group({
			username: ['', Validators.required],
			password: ['', Validators.required],
		});

	}

	fetchDataFromLocalStorage() {

		if (window.localStorage) {
			if (localStorage.getItem('charts')) {
				this.charts = JSON.parse(localStorage.getItem('charts'));
			}
		}
	}

	checkUserLoggedIn() {
		if (this.authService.isLoggedIn()) {
			console.log('Saving Visulaziation');
			this.saveCharts();
		} else {
			this.showSignUpPopUp();
		}
	}

	getDashboardName() {
		$('#dashboarModal').modal();
	}


	login() {
		console.log('Login form: ', this.loginForm);
		const newRecord = {
			'username': this.loginForm.get('username').value,
			'password': this.loginForm.get('password').value
		}
		this.authService.login(newRecord).subscribe((res: any) => {
			console.log('login res: ', res);
			// Hide the modal back
			$('#signupModal').modal('hide');
			this.loginForm.reset({});
			this.registerForm.reset({});

			this.authService.saveToken(res.token);
			this.authService.setLoggedInUserId(res.user_id);

			// Save the chart
			this.saveCharts();

		}, err => {
			console.log('Error: ', err);

		});
	}

	register() {
		console.log('Register Form: ', this.registerForm);
		const formJson = {
			'fullName': this.registerForm.get('fullName').value,
			'username': this.registerForm.get('username').value,
			'mobileNumber': this.registerForm.get('mobileNumber').value,
			'email': this.registerForm.get('email').value,
			'password': this.registerForm.get('password').value
		};

		this.authService.createUser(formJson).subscribe(res => {
			console.log('registeration success: ', res);
			// Hide the modal back
			$('#signupModal').modal('hide');
			this.loginForm.reset({});
			this.registerForm.reset({});

			// Save the chart
			this.saveCharts();

		}, err => {
			console.log('error: ', err);

		});
	}


	showSignUpPopUp() {
		$('#signupModal').modal();
		$('#home').tab('show');
	}


	ngAfterViewInit() {
		// this.charts.forEach(el => {
		// 	this.addWidget(el);
		// });
	}

	getLangDirection() {
		if (localStorage.getItem('lang')) {
			if (localStorage.getItem('lang') != 'en') {
				return 'rtl'
			}
		}
		return 'ltr';
	}

	refresh() {
		this.charts = [];
		this.fetchDataFromLocalStorage();
	}

	saveDashboard() {

		const obj = new DatasourceDashboard();
		obj.name = this.dashboardName;
		obj.user = this.authService.getLoggedInUserId();
		obj.layout = null;
		obj.widgets = this.widgetIds;


		// this.newRecord.permissions = JSON.stringify(permissions);

		this.isLoading = true;
		this.datasourceDashboardService.create(obj).subscribe((response) => {
			console.log('server response: ', response);
			const msg = 'Record successfully created';
			this.isLoading = false;
		}, (err) => {
			const msg = 'There was an error creating record'
		});
	}

	saveCharts() {
		// The array is deep copied to the uploadCharts
		const uploadCharts = $.extend(true, [], this.charts);
		console.log('old charts: ', this.charts);

		uploadCharts.map(chart => {
			chart.name = chart.layout.hasOwnProperty('title') ? chart.layout.title.text : 'CHART_NAME';
			chart.layout['title'] = chart.name;
			chart.layout = JSON.stringify(chart.layout);
			chart.config = JSON.stringify(chart.config);
			chart.data = JSON.stringify(chart.data);
			delete chart['gridstack'];
			delete chart['id'];
			delete chart['filteredData'];
			chart.user = this.authService.getLoggedInUserId();
			return chart;
		});

		console.log('new charts: ', uploadCharts);
		this.widgetService.addBulkWidgets(uploadCharts).subscribe(res => {
			console.log(res);
			this.widgetIds = res.ids;
			if (!this.dashboardName.length) {
				this.getDashboardName();
			} else {
				this.saveDashboard();
			}
		}, err => {
			console.log('err: ', err);
		});

	}

	resetCharts() {
		Swal({
			title: this.translate.instant('RESET-ALL-ALERT'),
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: this.translate.instant('CONFIRM-BUTTONT-TEXT'),
			cancelButtonText: this.translate.instant('CANCEL'),
			useRejections: true
		}).then(
			result => {
				this.charts = [];
				if (localStorage.getItem('charts')) {
					localStorage.removeItem('charts');
				}
			},
			dismiss => {
				console.log(`dialog was dismissed by ${dismiss}`);
			});
	}
	removeChart(chartId) {
		this.charts = JSON.parse(localStorage.getItem('charts'));
		this.charts.forEach((el, i) => {
			if (el.id === chartId) {
				this.charts.splice(i, 1);
			}
		});
		if (this.charts.length === 0) {
			localStorage.setItem('chartId', JSON.stringify(1));
		}
		localStorage.setItem('charts', JSON.stringify(this.charts));
	}


}
