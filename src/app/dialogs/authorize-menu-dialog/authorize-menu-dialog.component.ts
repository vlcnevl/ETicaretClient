import { ListRole } from './../../contracts/roles/list_role';
import { Component, Inject, OnInit } from '@angular/core';
import { BaseDialog } from '../base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RoleService } from 'src/app/services/common/models/role.service';

@Component({
  selector: 'app-authorize-menu-dialog',
  templateUrl: './authorize-menu-dialog.component.html',
  styleUrls: ['./authorize-menu-dialog.component.scss']
})
export default class AuthorizeMenuDialogComponent extends BaseDialog<AuthorizeMenuDialogComponent> implements OnInit{
  constructor(dialogRef:MatDialogRef<AuthorizeMenuDialogComponent>, @Inject(MAT_DIALOG_DATA) public data:any,private roleService:RoleService){
    super(dialogRef)
  }
  listRole:{roles:ListRole[],totalCount:number}
  async ngOnInit() {
    this.listRole = await this.roleService.getRoles(-1,-1);
  }



}





export enum AuthorizeMenuState{
  Yes,No
}
