import {
  AlertifyService,
  MessageType,
  Position,
} from './../../services/admin/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, Inject, Output, OnInit } from '@angular/core';
import { BaseDialog } from '../base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { ProductService } from 'src/app/services/common/models/product.service';
import { ListProductImage } from 'src/app/contracts/product/list_product_image';
import { SpinnerType } from 'src/app/base/base.component';
import { MatCard } from '@angular/material/card';
import { DialogService } from 'src/app/services/common/dialog.service';
import {
  DeleteDialogComponent,
  DeleteState,
} from '../delete-dialog/delete-dialog.component';

declare var $: any;

@Component({
  selector: 'app-select-product-image-dialog',
  templateUrl: './select-product-image-dialog.component.html',
  styleUrls: ['./select-product-image-dialog.component.scss'],
})
export class SelectProductImageDialogComponent
  extends BaseDialog<SelectProductImageDialogComponent>
  implements OnInit
{
  constructor(
    dialogRef: MatDialogRef<SelectProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ImageUploadState | string,
    private productService: ProductService,
    private spinner: NgxSpinnerService,
    private alertify: AlertifyService,
    private dialogService: DialogService
  ) {
    super(dialogRef);
  }

  images: ListProductImage[];

  async ngOnInit() {
    this.spinner.show(SpinnerType.BallNewton);
    this.images = await this.productService.readImage(this.data as string, () =>
      this.spinner.hide(SpinnerType.BallNewton)
    );
  }

  async deleteImage(imageId: string, event: any) {
    this.dialogService.openDialog({
      componentType: DeleteDialogComponent,
      data: DeleteState.Yes,
      afterClosed: async () => {
        this.spinner.show(SpinnerType.BallNewton);
        await this.productService.deleteImage(
          this.data as string,
          imageId,
          () => {
            this.spinner.hide(SpinnerType.BallNewton);
            this.alertify.message('resim basariyla silindi', {
              messageType: MessageType.Success,
              position: Position.TopRight,
            });

            var card = $(event.srcElement).parent().parent().parent(); //butondan carda çıktık.
            card.fadeOut(500);
          }
        );
      },
    });
  }

  showcase(imageId:string)
  {
    this.spinner.show(SpinnerType.BallFall);
    this.productService.changeShowcaseImage(imageId,this.data as string,()=>{this.spinner.hide(SpinnerType.BallFall)})
  }


  @Output() options: Partial<FileUploadOptions> = {
    accept: '.png,.jpg,.jpeg ',
    controller: 'products',
    action: 'upload',
    isAdminPage: true,
    queryString: `id=${this.data}`,
  };
}

export enum ImageUploadState {
  Close,
}
