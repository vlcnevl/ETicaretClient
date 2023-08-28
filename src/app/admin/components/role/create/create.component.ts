import { Component, EventEmitter, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { RoleService } from 'src/app/services/common/models/role.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent {


  constructor(spinner:NgxSpinnerService, private roleService:RoleService,private alertify:AlertifyService) {
    super(spinner);
   }

  @Output() createdRole:EventEmitter<any> = new EventEmitter();

  create(name:HTMLInputElement){
    this.showSpinner(SpinnerType.BallFall);

    this.roleService.create(name.value,()=>{
      this.hideSpinner(SpinnerType.BallFall);
      this.alertify.message("Rol başarıyla eklendi.",{
        messageType: MessageType.Success,
        position:Position.TopRight
      })
      this.createdRole.emit(name.value);
    },message=>{
        this.alertify.message(message,{messageType:MessageType.Error,position:Position.TopRight});
    });
  }
}
