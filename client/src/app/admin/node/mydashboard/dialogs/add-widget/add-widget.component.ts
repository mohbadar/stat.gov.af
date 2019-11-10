import { Component, OnInit, Output, Input, EventEmitter, Inject, AfterViewInit } from '@angular/core';
import { RoleService } from '../../../../../services/node/role.service';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Role } from '../../../../../models/role';

@Component({
	selector: 'app-add-widget',
	templateUrl: './add-widget.component.html',
	styleUrls: ['./add-widget.component.scss']
})
export class AddWidgetComponent implements OnInit {

	@Output()
	toggleModal = new EventEmitter<Object>();

	isLoading = false;
	editForm: FormGroup;
	@Input() data;
	@Input() dashboard;


	constructor(private formBuilder: FormBuilder) { }

	ngOnInit() {
		console.log("Widgets", this.data);

		this.editForm = this.formBuilder.group({
			name: ['', [Validators.required]],
		});
	}

	submit() {
		// TODO: Add submit logic
	}

	cancelUpdate() {

	}

}
