import { Component, OnInit, Output, Input, EventEmitter, Inject, AfterViewInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { DatasourceDashboardService } from 'app/services/datasource.dashboard.service';
import { AuthService } from 'app/services/auth.service';
import { DatasourceDashboard } from 'app/models/datasource.dashboard';
import { UserService } from 'app/services/node/user.service';
declare var $: any;

@Component({
  selector: 'app-create-mydashboard',
  templateUrl: './create-mydashboard.component.html',
  styleUrls: ['./create-mydashboard.component.scss']
})
export class CreateMydashboardComponent implements OnInit {

  @Output()
	toggleModal = new EventEmitter<Object>();
	@Input() data;
	myForm: FormGroup;
	isLoading = false;
  user: any;

  constructor(
      public datasourceDashboardService: DatasourceDashboardService, 
      private formBuilder: FormBuilder,
      private authService: AuthService,
      private userService: UserService
    ) {
		this.myForm = this.formBuilder.group({
			name: ['', [Validators.required]],
		});
	}

	ngOnInit() {
    console.log("User Data", this.authService.getUserDetails());
    
    this.userService.loadUser(this.authService.getLoggedInUserId()).subscribe(data => {
        this.user = data;
    });
   }

	ngAfterViewInit() {
		if ($('.selectpicker').length !== 0) {
			$('.selectpicker').selectpicker({
				iconBase: 'fa',
				tickIcon: 'fa-check'
			});
		}
	}

	submit() {
		// Create new object
		// this.newRecord = new NodeRole();
		// this.newRecord.name = this.myForm.get('name').value;
		// this.newRecord.description = this.myForm.get('description').value;
    // this.newRecord.isActive = this.myForm.get('active').value + "";

    
    const formJson = {
      name : this.myForm.get('name').value,
      user: this.authService.getLoggedInUserId()
    };

    const obj = new DatasourceDashboard();
    obj.name = this.myForm.get('name').value,
    obj.user = this.authService.getLoggedInUserId();
    obj.layout= null;
    obj.widgets = null;


		// this.newRecord.permissions = JSON.stringify(permissions);

		console.log('here is the new record', JSON.stringify(localStorage.getItem('loggedInUserId')));

				this.isLoading = true;
		this.datasourceDashboardService.create(obj).subscribe((response) => {
			console.log('server response: ', response);
			const msg = 'Record successfully created';
			this.isLoading = false;
			this.myForm.reset({});
			this.toggleModal.emit({ 'modalType': 'create', show: false, 'newRecord': response });
			// this.showNotification('top', 'center', msg, 'success', 'pe-7s-check');
		}, (err) => {
			const msg = 'There was an error creating record'
			// this.showNotification('top', 'center', msg, 'danger', 'pe-7s-attention');
    });
    
	}


	cancelRegistration() {
		if (this.myForm.dirty) {
			const conf = confirm('Are you sure you want to cancel?');
			if (conf) {
				this.myForm.reset({});
				$('.selectpicker').val('default');
				$('.selectpicker').selectpicker('refresh');
				this.toggleModal.emit({ 'modalType': 'create', show: false });
			}
		} else {
			$('.selectpicker').val('default');
			$('.selectpicker').selectpicker('refresh');
			this.toggleModal.emit({ 'modalType': 'create', show: false });
		}
	}

	// showNotification(from, align, msg, type, icon) {
	// 	$.notify({
	// 		icon: icon,
	// 		message: msg

	// 	}, {
	// 			type: type,
	// 			timer: 4000,
	// 			placement: {
	// 				from: from,
	// 				align: align
	// 			}
	// 		});
	// }

}
