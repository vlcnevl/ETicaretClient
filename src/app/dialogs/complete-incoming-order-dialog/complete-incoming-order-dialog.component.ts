import { Component, Inject } from '@angular/core';
import { BaseDialog } from '../base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-complete-incoming-order-dialog',
  templateUrl: './complete-incoming-order-dialog.component.html',
  styleUrls: ['./complete-incoming-order-dialog.component.scss']
})
export class CompleteIncomingOrderDialogComponent extends BaseDialog<CompleteIncomingOrderDialogComponent>{

constructor(dialogRef:MatDialogRef<CompleteIncomingOrderDialogComponent>, @Inject(MAT_DIALOG_DATA) public data:CompleteIncomingOrderState) {
  super(dialogRef);

}
}
export enum CompleteIncomingOrderState{
  Yes,
  No
}
