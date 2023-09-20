import { Component, OnInit, Inject } from '@angular/core';
import { BaseDialog } from '../base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RoleService } from 'src/app/services/common/models/role.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-update-role-dialog',
  templateUrl: './update-role-dialog.component.html',
  styleUrls: ['./update-role-dialog.component.scss']
})
export class UpdateRoleDialogComponent extends BaseDialog<UpdateRoleDialogComponent> implements OnInit{

  constructor(dialogRef:MatDialogRef<UpdateRoleDialogComponent>,@Inject(MAT_DIALOG_DATA) public data:any,private roleService:RoleService,private customToastrService:CustomToastrService) {
    super(dialogRef);

  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  updateRole(role:HTMLInputElement)
  {
    this.roleService.updateRole(this.data.id,role.value,()=>{
      this.customToastrService.message("Rol güncelleme işlemi başarılı.","Rol Güncelleme Tamamlandı.",{messageType:ToastrMessageType.Success,position:ToastrPosition.TopRight})
    });
    debugger;


  }
}
