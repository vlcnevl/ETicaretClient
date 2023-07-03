import { OrderService } from './../../services/common/models/order.service';
import { Component, Inject, OnInit } from '@angular/core';
import { BaseDialog } from '../base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SingleOrder } from 'src/app/contracts/order/singleOrder';

@Component({
  selector: 'app-order-detail-dialog',
  templateUrl: './order-detail-dialog.component.html',
  styleUrls: ['./order-detail-dialog.component.scss']
})
export class OrderDetailDialogComponent extends BaseDialog<OrderDetailDialogComponent> implements OnInit{
  constructor(dialogRef:MatDialogRef<OrderDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:OrderDetailState | string, // seçilen orderin id sini alabilirim yada cancel statei
    private orderService:OrderService
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
}

export enum OrderDetailState{
  Close,
  OrderComplete
}

