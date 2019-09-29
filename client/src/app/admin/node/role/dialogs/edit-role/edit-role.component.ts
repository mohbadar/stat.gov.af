import { Component, OnInit, Output, Input, EventEmitter, Inject, AfterViewInit } from '@angular/core';
import { RoleService } from '../../../../../services/node/role.service';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Role } from '../../../../../models/role';

declare var $: any;

export class NodeRole {
  id:string;
  name:string;
  description:string;
  permissions: string;
  isActive:string;
}

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.scss']
})
export class EditRoleComponent implements OnInit, AfterViewInit {
    @Output()
    toggleModal = new EventEmitter<Object>();
  
    isLoading = false;
    newRole: NodeRole;
    editForm: FormGroup;
    @Input() data;
  
    formControl = new FormControl('', [
      Validators.required
    ]);
    permissions: any[];
  
  
    constructor(public roleService: RoleService, private formBuilder: FormBuilder) { }
  
    ngOnInit() {
      console.log('Dialog: ', JSON.parse(JSON.stringify(this.data.permissions)));

      this.permissions = JSON.parse(JSON.stringify(this.data.permissions));
      this.editForm = this.formBuilder.group({
        name: [this.data.name, [Validators.required]],
        description: [this.data.description, [Validators.required]],
        active: this.data.isActive
      });
    }
  
    ngAfterViewInit() {
      const vals = [];
      this.permissions.forEach(el => {
        vals.push(el._id);
      });
      //  Init Bootstrap Select Picker
      if ($('.selectpicker').length !== 0) {
        $('.selectpicker').selectpicker({
          iconBase: 'fa',
          tickIcon: 'fa-check'
        });
        $('.selectpicker').selectpicker('val', vals);
      }
    }
  
    submit() {

      const vals = Array.from($('.selectpicker').find(':selected')).map((item) => {
        return String($(item).val());
      });
      
          
      // Extract permissions by their IDs
      const permissions = this.permissions.filter((item) => {
        console.log("Item Id", item._id);
        
        if (vals.includes(item._id)) {
          return item;
        }
      });
  
      console.log('Final group(s): ', permissions);
      // Create new role object
      this.newRole = new NodeRole();
      this.newRole.id = this.data.id;
      this.newRole.name = this.editForm.get('name').value;
      this.newRole.description = this.editForm.get('description').value;
      this.newRole.isActive = this.editForm.get('active').value;
  
      this.newRole.permissions = JSON.stringify(permissions);
      console.log('here is the updated role', JSON.stringify(this.newRole));
      this.updateRole();
    }
  
    updateRole() {
      this.roleService.update(this.newRole).subscribe(resp => {
        const msg = 'Role successfully updated';
        console.log('response', resp);
        this.toggleModal.emit({ 'modalType': 'edit', button: 'update', show: false, 'newRecord': resp });
        // this.showNotification('top', 'center', msg, 'success', 'pe-7s-check');
      }, (err) => {
        const msg = 'There was an error updating the role';
        // this.showNotification('top', 'center', msg, 'danger', 'pe-7s-attention');
      });
    }
  
    onNoClick(): void {
      // this.dialogRef.close();
    }
  
    stopEdit(): void {
      // this.roleService.updateRole(this.data);
    }
  
    cancelUpdate() {
      if (this.editForm.dirty) {
        const conf = confirm('Are you sure you want to cancel?');
        if (conf) {
  
          this.editForm.reset({});
          $('.selectpicker').val('default');
          $('.selectpicker').selectpicker('refresh');
          this.toggleModal.emit({ 'modalType': 'edit', button: 'cancel', show: false });
        }
      } else {
        $('.selectpicker').val('default');
        $('.selectpicker').selectpicker('refresh');
        this.toggleModal.emit({ 'modalType': 'edit', show: false });
      }
    }
  
    showNotification(from, align, msg, type, icon) {
      $.notify({
        icon: icon,
        message: msg
  
      }, {
          type: type,
          timer: 4000,
          placement: {
            from: from,
            align: align
          }
        });
    }
  
  }
  