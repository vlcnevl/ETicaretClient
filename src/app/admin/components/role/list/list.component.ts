import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AlertifyService } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { RoleService } from 'src/app/services/common/models/role.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent{

  constructor(spinner: NgxSpinnerService,private roleService: RoleService,private alertify: AlertifyService,private dialogService :DialogService) {
    super(spinner);
  }

  displayedColumns: string[] = ['name'];
  dataSource: MatTableDataSource<string> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getProducts() {
    this.showSpinner(SpinnerType.BallNewton); // paginatore default deger verdik
    const allProducts:{totalCount:number; products:ListProduct[]} = await this.productService.read(this.paginator ? this.paginator.pageIndex: 0,this.paginator ? this.paginator.pageSize :5 ,
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

    this.dataSource = new MatTableDataSource<ListProduct>(allProducts.products);
    this.paginator.length = allProducts.totalCount;
  }

  async ngOnInit() {
    await this.getProducts();
  }

  async pageChanged(){
    await this.getProducts()
  }


}
