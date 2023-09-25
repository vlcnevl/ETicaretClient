import { ProductService } from './../../../../services/common/models/product.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { CreateProduct } from 'src/app/contracts/product/create_product';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { QrcodeReadingDialogComponent } from 'src/app/dialogs/qrcode-reading-dialog/qrcode-reading-dialog.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent extends BaseComponent {

  constructor(spinner:NgxSpinnerService, private productService:ProductService,private alertify:AlertifyService,private dialogService:DialogService) {
    super(spinner);
   }

  @Output() createdProduct:EventEmitter<CreateProduct> = new EventEmitter();

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
      this.createdProduct.emit(product);
    },message=>{
        this.alertify.message(message,{messageType:MessageType.Error,position:Position.TopRight});
    });
  }


  readQr()
  {
    this.dialogService.openDialog({
      componentType:QrcodeReadingDialogComponent,
      options:{width:"700px",height:"600px"},
      data:null,
      afterClosed:()=>{

      }
    })
  }


}
