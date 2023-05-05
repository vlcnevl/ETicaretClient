import { NgxSpinnerService } from 'ngx-spinner';
import { Component, Inject, Output, OnInit } from '@angular/core';
import { BaseDialog } from '../base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { ProductService } from 'src/app/services/common/models/product.service';
import { ListProductImage } from 'src/app/contracts/product/list_product_image';
import { SpinnerType } from 'src/app/base/base.component';

@Component({
  selector: 'app-select-product-image-dialog',
  templateUrl: './select-product-image-dialog.component.html',
  styleUrls: ['./select-product-image-dialog.component.scss'],
})
export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent> implements OnInit {
  constructor(
    dialogRef: MatDialogRef<SelectProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ImageUploadState | string,
    private productService:ProductService,
    private spinner:NgxSpinnerService
    ) {
    super(dialogRef);
  }

  images:ListProductImage[];

  async ngOnInit() {
    this.spinner.show(SpinnerType.BallNewton)
   this.images = await this.productService.readImage(this.data as string,()=> this.spinner.hide(SpinnerType.BallNewton));
  }


  deleteImage(id:string)
  {

  }




  @Output() options: Partial<FileUploadOptions> = {
    accept:".png,.jpg,.jpeg ",
    controller:"products",
    action:"upload",
    isAdminPage:true,
    queryString:`id=${this.data}`
  }





}

export enum ImageUploadState {
  Close
}
