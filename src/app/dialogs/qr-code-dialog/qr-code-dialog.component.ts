import { Component, Inject, OnInit } from '@angular/core';
import { BaseDialog } from '../base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/common/models/product.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { QrCodeService } from 'src/app/services/common/qr-code.service';

@Component({
  selector: 'app-qr-code-dialog',
  templateUrl: './qr-code-dialog.component.html',
  styleUrls: ['./qr-code-dialog.component.scss']
})
export class QrCodeDialogComponent extends BaseDialog<QrCodeDialogComponent> implements OnInit{
  constructor( dialogRef: MatDialogRef<QrCodeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:string, private qrCodeService:QrCodeService,private domSanitizer:DomSanitizer) {
    super(dialogRef);
  }

  imageUrl:SafeUrl;
 async ngOnInit() {
    const blob:Blob = await this.qrCodeService.getQrCode(this.data);
    const url:string = URL.createObjectURL(blob);
    this.imageUrl = this.domSanitizer.bypassSecurityTrustUrl(url);
  }
}
