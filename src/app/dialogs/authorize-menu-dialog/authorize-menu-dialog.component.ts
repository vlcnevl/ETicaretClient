import { ListRole } from './../../contracts/roles/list_role';
import { Component, Inject, OnInit } from '@angular/core';
import { BaseDialog } from '../base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RoleService } from 'src/app/services/common/models/role.service';
import { MatSelectionList } from '@angular/material/list';
import { AuthorizationEndpointService } from 'src/app/services/common/models/authorization-endpoint.service';

@Component({
  selector: 'app-authorize-menu-dialog',
  templateUrl: './authorize-menu-dialog.component.html',
  styleUrls: ['./authorize-menu-dialog.component.scss']
})
export default class AuthorizeMenuDialogComponent extends BaseDialog<AuthorizeMenuDialogComponent> implements OnInit{
  constructor(dialogRef:MatDialogRef<AuthorizeMenuDialogComponent>, @Inject(MAT_DIALOG_DATA) public data:any,private roleService:RoleService,private authorizationEndpointService:AuthorizationEndpointService){
    super(dialogRef)
  }
  listRole:{roles:ListRole[],totalCount:number}
  async ngOnInit() {
    this.listRole = await this.roleService.getRoles(-1,-1);
    const roles = await this.authorizationEndpointService.getRolesEndpoint(this.data.code,this.data.menuName)
    debugger;
  }

  assignRole(rolesComponent:MatSelectionList)
  {
   const roles:string[] = rolesComponent.selectedOptions.selected.map(o=> o._elementRef.nativeElement.innerText)

    this.authorizationEndpointService.assignRoleEndpoint(roles,this.data.code,this.data.menuName,()=>{

    },
     error=>{}
    )
  }

}


export enum AuthorizeMenuState{
  Yes,No
}
