import { NgxSpinnerService } from 'ngx-spinner';
import { Component, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';
import { CreateProduct } from 'src/app/contracts/product/create_product';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent extends BaseComponent {
  constructor(spinner: NgxSpinnerService) {
    super(spinner);
  }
  ngOnInit(): void {}


  @ViewChild(ListComponent) listComponent:ListComponent;

  createdProduct(createdProduct:CreateProduct){ // ürün ekleyince list componentdeki get productsu tetikledi
    this.listComponent.getProducts(); // redux yada service kullanılabilridi
  }


}
