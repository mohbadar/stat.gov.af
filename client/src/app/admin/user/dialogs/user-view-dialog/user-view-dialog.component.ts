import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from './../../../../services/user.service';

@Component({
  selector: 'user-view-dialog',
  templateUrl: './user-view-dialog.component.html',
  styleUrls: ['./user-view-dialog.component.scss']
})
export class UserViewDialogComponent implements OnInit {
	@Output()
	toggleModal = new EventEmitter<Object>();
	@Input() data;

	constructor(public userService: UserService) { }

	compareFn(c1,  c2): boolean {
		return c1 && c2 ? c1.id === c2.id : c1 === c2;
	}

	ngOnInit() {
		console.log('data is: ', this.data);
		
	 }

	onNoClick(): void {
		// this.toggleModal.emit({"modalType": "view", show: false});
	}
}
