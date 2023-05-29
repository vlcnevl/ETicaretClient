import { NgxSpinnerService } from 'ngx-spinner';
import { Component } from '@angular/core';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { SignalRService } from 'src/app/services/common/signalr.service';
import { ReceiveFunctions } from 'src/app/constants/receive-functions';
import { HubUrls } from 'src/app/constants/hub-url';
import { AlertifyOptions, AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent{
  constructor(spinner:NgxSpinnerService,private signalRService:SignalRService,private alertifyService:AlertifyService) {
    super(spinner);
    signalRService.start(HubUrls.ProductHub)
  }
  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallNewton)
    this.signalRService.on(ReceiveFunctions.ProductAddedMessageReceiveFunction,message=>{
      this.alertifyService.message(message,{messageType:MessageType.Success,position:Position.TopRight})
    })
  }

}
