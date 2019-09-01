import { Component, OnInit, Output, Input, EventEmitter, Inject } from '@angular/core';
import { RoleService } from './../../../../services/role.service';

@Component({
  selector: 'role-view-dialog',
  templateUrl: './role-view-dialog.component.html',
  styleUrls: ['./role-view-dialog.component.scss']
})
export class RoleViewDialogComponent implements OnInit {

  @Output()
  toggleModal = new EventEmitter<Object>();
  @Input() data;

  constructor(public roleService: RoleService) { }

  ngOnInit() { }

  onNoClick(): void {
    // this.toggleModal.emit({"modalType": "view", show: false});
  }
}
