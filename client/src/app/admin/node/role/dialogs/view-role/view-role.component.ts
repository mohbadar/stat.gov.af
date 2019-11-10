import { Component, OnInit, Output, Input, EventEmitter, Inject } from '@angular/core';
import { RoleService } from 'app/services/role.service';

@Component({
  selector: 'app-view-role',
  templateUrl: './view-role.component.html',
  styleUrls: ['./view-role.component.scss']
})
export class ViewRoleComponent implements OnInit {

  @Output()
  toggleModal = new EventEmitter<Object>();
  @Input() data;
  permissions: [];

  constructor(public roleService: RoleService) { 

  }

  ngOnInit() {

    console.log("Permissions: ", this.data.permissions);
    this.permissions = this.data.permissions;
   }

  onNoClick(): void {
    // this.toggleModal.emit({"modalType": "view", show: false});
  }
}
