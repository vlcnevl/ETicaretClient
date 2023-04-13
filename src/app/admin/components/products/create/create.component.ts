import { ProductService } from './../../../../services/common/models/product.service';
import { Component, OnInit } from '@angular/core';
import { CreateProduct } from 'src/app/contracts/product/create_product';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent extends BaseComponent {

  constructor(spinner:NgxSpinnerService, private productService:ProductService,private alertify:AlertifyService) {
    super(spinner);
   }
  create(name:HTMLInputElement,stock:HTMLInputElement,price:HTMLInputElement,description:HTMLInputElement){
    this.showSpinner(SpinnerType.BallFall);
   const product:CreateProduct = new CreateProduct();
    product.name = name.value;
    product.price = parseFloat(price.value);
    product.stock = parseInt(stock.value);
    product.description = description.value;

    this.productService.create(product,()=>{
      this.hideSpinner(SpinnerType.BallFall);
      this.alertify.message("Ürün başarıyla eklendi.",{
        messageType: MessageType.Success,
        position:Position.TopRight
      })
    },message=>{
        this.alertify.message(message,{messageType:MessageType.Error,position:Position.TopRight});
    });
  }
}
