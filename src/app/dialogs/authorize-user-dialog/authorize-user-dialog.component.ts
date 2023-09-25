import { Component, Inject } from '@angular/core';
import { BaseDialog } from '../base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/common/models/user.service';
import { ListRole } from 'src/app/contracts/roles/list_role';
import { MatSelectionList } from '@angular/material/list';
import { RoleService } from 'src/app/services/common/models/role.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';

@Component({
  selector: 'app-authorize-user-dialog',
  templateUrl: './authorize-user-dialog.component.html',
  styleUrls: ['./authorize-user-dialog.component.scss']
})
export class AuthorizeUserDialogComponent extends BaseDialog<AuthorizeUserDialogComponent> {
  constructor(dialogRef:MatDialogRef<AuthorizeUserDialogComponent>, @Inject(MAT_DIALOG_DATA) public data:any,private userService:UserService,private roleService:RoleService,private spinner:NgxSpinnerService){
    super(dialogRef)
  }

  listRole:{roles:ListRole[],totalCount:number}
  assignedRoles:Array<string>;
  async ngOnInit() {
    this.spinner.show(SpinnerType.BallNewton)
    this.listRole = await this.roleService.getRoles(-1,-1);
    this.assignedRoles = await this.userService.getRolesToUser(this.data,()=>{this.spinner.hide(SpinnerType.BallNewton)},()=>{});
  }

  isExist(name:string):boolean
  {
    return this.assignedRoles?.indexOf(name)>-1
  }

  assignRole(rolesComponent:MatSelectionList)
  {
   const roles:string[] = rolesComponent.selectedOptions.selected.map(o=> o._elementRef.nativeElement.innerText)
   this.spinner.show(SpinnerType.SquareJellyBox)
   this.userService.assginRoleToUser(this.data,roles,()=>{this.spinner.hide(SpinnerType.SquareJellyBox)},(error)=>{this.spinner.hide(SpinnerType.SquareJellyBox)})
   this.spinner.hide(SpinnerType.SquareJellyBox)
  }

}
