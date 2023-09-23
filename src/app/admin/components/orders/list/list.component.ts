import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListOrder } from 'src/app/contracts/order/listOrder';
import { OrderDetailDialogComponent } from 'src/app/dialogs/order-detail-dialog/order-detail-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { OrderService } from 'src/app/services/common/models/order.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent {

  constructor(
    spinner: NgxSpinnerService,
    private orderService: OrderService,
    private alertify: AlertifyService,
    private dialogService :DialogService
  ) {
    super(spinner);
  }

  displayedColumns: string[] = ['orderCode','userName','address','totalPrice','createdDate','completed','viewDetail','delete'];
  dataSource: MatTableDataSource<ListOrder> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getOrders() {
    this.showSpinner(SpinnerType.BallNewton); // paginatore default deger verdik
    const allOrders:{totalCount:number; orders:ListOrder[]} = await this.orderService.read(this.paginator ? this.paginator.pageIndex: 0,this.paginator ? this.paginator.pageSize :5 ,
      () => {
        this.hideSpinner(SpinnerType.BallNewton);
      },
      (message) => {
        this.alertify.message(message, {
          messageType: MessageType.Error,
          position: Position.TopRight,
        });
      }
    );

    this.dataSource = new MatTableDataSource<ListOrder>(allOrders.orders);
    this.paginator.length = allOrders.totalCount;
  }

  async ngOnInit() {
    await this.getOrders();
  }

  async pageChanged(){
    await this.getOrders()
  }

  viewDetail(orderId:string)
  {
    this.dialogService.openDialog({
      componentType:OrderDetailDialogComponent,
      options:{width:"800px"},
      data:orderId
    })
  }




}
