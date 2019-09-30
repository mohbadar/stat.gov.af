import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from './../../../../../services/node/user.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {

	@Output()
	toggleModal = new EventEmitter<Object>();
  @Input() data;
  role;

	constructor(public userService: UserService) { }

	compareFn(c1,  c2): boolean {
		return c1 && c2 ? c1.id === c2.id : c1 === c2;
	}

	ngOnInit() {
		console.log('data is: ', this.data);
		this.role = JSON.parse(JSON.stringify(this.data.roles));
	 }

	onNoClick(): void {
		// this.toggleModal.emit({"modalType": "view", show: false});
	}
}
