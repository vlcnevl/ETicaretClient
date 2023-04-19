import { ProductService } from './../../../../services/common/models/product.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { BaseComponent } from 'src/app/base/base.component';
import { ListProduct } from 'src/app/contracts/product/list_product';
import {
  AlertifyService,
  MessageType,
  Position,
} from 'src/app/services/admin/alertify.service';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private productService: ProductService,
    private alertify: AlertifyService
  ) {
    super(spinner);
  }

  displayedColumns: string[] = ['name','stock','price','description','createdDate','updatedDate','update','delete'];
  dataSource: MatTableDataSource<ListProduct> = null;
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




  // delete(id:string,event)
  // {
  //   const button:HTMLButtonElement =event.srcElement;

  //  $(button.parentElement.parentElement.parentElement).fadeOut(1000); //listede satırı sildik

  // }


}
