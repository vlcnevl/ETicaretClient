import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CustomToastrService {
  constructor(private toastr: ToastrService) {}

  message(message:string,tittle:string,toastrOptions:Partial<ToastrOptions>) {
    this.toastr[toastrOptions.messageType](message, tittle, {
      positionClass: toastrOptions.position
    });
  }
}

export class ToastrOptions {
  messageType : ToastrMessageType;
  position :ToastrPosition;
}


export enum ToastrMessageType {
  Success = 'success',
  Info = 'info',
  Warning = 'warning',
  Error = 'error',
}

export enum ToastrPosition {
  TopRight = 'toast-top-right',
  BottomRight = 'toast-bottom-right',
  BottomLeft = 'toast-bottom-left',
  TopLeft = 'toast-top-left',
  TopFull = 'toast-top-full-width',
  BottomFull = 'toast-bottom-full-width',
  TopCenter = 'toast-top-center',
  BottomCenter = 'toast-bottom-center',
}
