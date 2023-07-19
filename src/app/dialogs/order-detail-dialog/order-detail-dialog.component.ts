import { DialogService } from './../../services/common/dialog.service';
import { OrderService } from './../../services/common/models/order.service';
import { Component, Inject, OnInit } from '@angular/core';
import { BaseDialog } from '../base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SingleOrder } from 'src/app/contracts/order/singleOrder';
import { CompleteIncomingOrderDialogComponent } from '../complete-incoming-order-dialog/complete-incoming-order-dialog.component';
import { CompleteOrderState } from '../complete-order-dialog/complete-order-dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-order-detail-dialog',
  templateUrl: './order-detail-dialog.component.html',
  styleUrls: ['./order-detail-dialog.component.scss']
})
export class OrderDetailDialogComponent extends BaseDialog<OrderDetailDialogComponent> implements OnInit{
  constructor(dialogRef:MatDialogRef<OrderDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:OrderDetailState | string, // seçilen orderin id sini alabilirim yada cancel statei
    private orderService:OrderService,private dialogService:DialogService,private spinner:NgxSpinnerService,private customToastrService:CustomToastrService
    )
  {
    super(dialogRef);
  }

  singleOrder:SingleOrder;
  displayedColumns: string[] = ['name','price', 'quantity', 'totalPrice'];
  dataSource = [];
  clickedRows = new Set<any>();
  totalPrice:number;

  async ngOnInit() {
    this.singleOrder = await this.orderService.getById(this.data as string)
    this.dataSource = this.singleOrder.basketItems;
    this.totalPrice = this.singleOrder.basketItems.map((basketItem,index)=> basketItem.price*basketItem.quantity ).reduce((price,current)=> price+current)
  }

  completeOrder(){
    this.dialogService.openDialog({
      componentType:CompleteIncomingOrderDialogComponent,
      data:CompleteOrderState.Yes,
     afterClosed:async ()=>{
      this.spinner.show(SpinnerType.BallFall)
        await  this.orderService.completeOrder(this.data as string);
        this.spinner.hide(SpinnerType.BallFall)
        this.customToastrService.message("Sipariş tamamlama işlemi başarılı.","Sipariş Tamamlandı.",{messageType:ToastrMessageType.Success,position:ToastrPosition.TopRight})
     }
    })
  }


}

export enum OrderDetailState{
  Close,
  OrderComplete
}

