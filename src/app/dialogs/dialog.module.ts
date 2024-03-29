import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { SelectProductImageDialogComponent } from './select-product-image-dialog/select-product-image-dialog.component';
import { FileUploadModule } from '../services/common/file-upload/file-upload.module';
import {MatCardModule} from '@angular/material/card';
import { BasketItemRemoveDialogComponent } from './basket-item-remove-dialog/basket-item-remove-dialog.component';
import { CompleteOrderDialogComponent } from './complete-order-dialog/complete-order-dialog.component';
import { OrderDetailDialogComponent } from './order-detail-dialog/order-detail-dialog.component';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CompleteIncomingOrderDialogComponent } from './complete-incoming-order-dialog/complete-incoming-order-dialog.component';
import {MatBadgeModule} from '@angular/material/badge';
import { MatListModule } from '@angular/material/list';
import AuthorizeMenuDialogComponent from './authorize-menu-dialog/authorize-menu-dialog.component';
import { UpdateRoleDialogComponent } from './update-role-dialog/update-role-dialog.component';
import { AuthorizeUserDialogComponent } from './authorize-user-dialog/authorize-user-dialog.component';
import { QrCodeDialogComponent } from './qr-code-dialog/qr-code-dialog.component';
import { QrcodeReadingDialogComponent } from './qrcode-reading-dialog/qrcode-reading-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';

@NgModule({
  declarations: [DeleteDialogComponent, SelectProductImageDialogComponent, BasketItemRemoveDialogComponent, CompleteOrderDialogComponent, OrderDetailDialogComponent, CompleteIncomingOrderDialogComponent, AuthorizeMenuDialogComponent, UpdateRoleDialogComponent, AuthorizeUserDialogComponent, QrCodeDialogComponent, QrcodeReadingDialogComponent],
  imports: [
    CommonModule,MatDialogModule,MatButtonModule,FileUploadModule,MatCardModule,MatTableModule,MatToolbarModule,MatListModule,MatBadgeModule,MatInputModule,NgxScannerQrcodeModule]
})
export class DialogModule { }
