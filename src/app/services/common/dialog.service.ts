import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { DialogPosition, MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog:MatDialog) { }

  openDialog(dialogParameters:Partial<DialogParameters>){
    const dialogRef = this.dialog.open(dialogParameters.componentType,{
      data:dialogParameters.data,
      width:dialogParameters.options?.width,
      height:dialogParameters.options?.height,
      position:dialogParameters.options?.position,
    });

    dialogRef.afterClosed().subscribe(result=>{
      if(result==dialogParameters.data)
        dialogParameters.afterClosed();
    });
  }
}


export class DialogParameters{
  componentType:ComponentType<any>;
  data:any;
  afterClosed:()=> void;
  options?:Partial<DialogOptions> = new DialogOptions();
}
class DialogOptions{
  width?:string="250px";
  height?:string;
  position?:DialogPosition;
}
