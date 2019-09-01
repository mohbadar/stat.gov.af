import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { GroupService } from './../../../../services/group.service';

@Component({
  selector: 'group-view-dialog',
  templateUrl: './group-view-dialog.component.html',
  styleUrls: ['./group-view-dialog.component.scss']
})
export class GroupViewDialogComponent implements OnInit {

  @Output()
  toggleModal = new EventEmitter<Object>();
  @Input() data;

  constructor(public groupService: GroupService) { }
  ngOnInit() {
  }

  onNoClick(): void {
    // this.dialogRef.close();
  }
}
