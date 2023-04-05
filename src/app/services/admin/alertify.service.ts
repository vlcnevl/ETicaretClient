import { Injectable } from '@angular/core';
import { delay } from 'rxjs';
declare var alertify: any;

@Injectable({
  providedIn: 'root',
})
export class AlertifyService {
  constructor() {}


  // message( message: string, messageType: MessageType, position: Position,delay: number = 3)
  message(message:string,options:Partial<AlertifyOptions>){
    alertify.set('notifier', 'position', delay);
    alertify.set('notifier', 'position', options.position);
    alertify[options.messageType](message);
  }

  dismiss() {
    alertify.dismissAll();
  }
}

export class AlertifyOptions {
  messageType: MessageType = MessageType.Message;
  position: Position = Position.BottomLeft;
  delay: number = 3;
}

export enum MessageType {
  Error = 'error',
  Message = 'message',
  Notify = 'notify',
  Success = 'success',
  Warning = 'warning',
}

export enum Position {
  TopRight = 'top-right',
  TopCenter = 'top-center',
  TopLeft = 'top-left',
  BottomRight = 'bottom-right',
  BottomCenter = 'bottom-center',
  BottomLeft = 'bottom-left',
}
