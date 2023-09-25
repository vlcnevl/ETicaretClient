import { Component, OnInit, Inject, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { BaseDialog } from '../base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxScannerQrcodeComponent, ScannerQRCodeResult } from 'ngx-scanner-qrcode';
import { ProductService } from 'src/app/services/common/models/product.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';
declare var $:any;

@Component({
  selector: 'app-qrcode-reading-dialog',
  templateUrl: './qrcode-reading-dialog.component.html',
  styleUrls: ['./qrcode-reading-dialog.component.scss']
})
export class QrcodeReadingDialogComponent extends BaseDialog<QrcodeReadingDialogComponent> implements OnInit,OnDestroy{
  constructor( dialogRef: MatDialogRef<QrcodeReadingDialogComponent>,@Inject(MAT_DIALOG_DATA) public data:string,private productService:ProductService,private toastrService:CustomToastrService) {
    super(dialogRef);
  }


  ngOnDestroy(): void {
    this.scanner.stop();
  }

@ViewChild("scanner",{static:true}) scanner:NgxScannerQrcodeComponent;
@ViewChild("txtStock",{static:true}) stock:ElementRef;

 async ngOnInit()  {
  this.scanner.start();
  }

   eventTrigger:boolean = false;


  onEvent(e:any)
  {

    if(!this.eventTrigger)
    {
      const data : any = e[0].value;
      if(data !=null && data!="")
      {
       const jsonData = JSON.parse(data);
       const stockValue = (this.stock.nativeElement as HTMLInputElement).value;
       this.productService.updateStock(jsonData.Id,parseInt(stockValue),()=>{
            this.toastrService.message(`${jsonData.Name} adlı ürünün stok bilgileri başaryla güncellendi.`,'Stok güncellendi',{
              messageType:ToastrMessageType.Success,
              position:ToastrPosition.TopRight
            });
          });
      }
      this.eventTrigger=true;
    }


    }
}

