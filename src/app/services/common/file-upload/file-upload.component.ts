import { DialogService } from './../dialog.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './../../ui/custom-toastr.service';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { HttpClientService } from '../http-client.service';
import { AlertifyService, MessageType, Position } from '../../admin/alertify.service';
import { MatDialog } from '@angular/material/dialog';
import { FileUploadDialogComponent,FileUploadState } from 'src/app/dialogs/file-upload-dialog/file-upload-dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

constructor(private httpClientService:HttpClientService,private alertifyService:AlertifyService,private customToastrService:CustomToastrService,private dialog:MatDialog,private dialogService:DialogService,private spinner:NgxSpinnerService) {}

  @Input() options:Partial<FileUploadOptions>;
  public files: NgxFileDropEntry[];

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;

    const fileData:FormData = new FormData();

    for(const file of files)
    {
        (file.fileEntry as FileSystemFileEntry).file((_file:File)=>{
            fileData.append(_file.name,_file,file.relativePath);
        });
    }

      this.dialogService.openDialog( {
        componentType:FileUploadDialogComponent,
        data:FileUploadState.Yes,
        afterClosed:()=>{
          this.spinner.show(SpinnerType.SquareJellyBox);
          this.httpClientService.post(
            {controller:this.options.controller,
              action:this.options.action,
              queryString:this.options.queryString,
              headers: new HttpHeaders({"responseType":"blob"})
           },fileData).subscribe(data => {
            this.spinner.hide(SpinnerType.SquareJellyBox);
            const message ="dosyalar başarıyla yüklenmiştir.";

            if(this.options.isAdminPage)
              {
                this.alertifyService.message(message,{messageType:MessageType.Success,position:Position.TopRight});
              }
              else
              {
                this.customToastrService.message(message,"success",{messageType:ToastrMessageType.Success,position:ToastrPosition.TopRight})
              }
           },(error:HttpErrorResponse) =>
           {
            const message ="dosyalar yüklenirken hata oluştu.";
            if(this.options.isAdminPage)
              {
                this.alertifyService.message(message,{messageType:MessageType.Error,position:Position.TopRight});
              }
              else
              {
                this.customToastrService.message(message,"success",{messageType:ToastrMessageType.Error,position:ToastrPosition.TopRight})
              }
              this.spinner.hide(SpinnerType.SquareJellyBox);

           });
            /*
            rxjs güncellemesi ile gelen yenilik
           this.httpClientService.get({controller:"products"}).subscribe({
           next: data=>{console.log(data)},
           error: (error:HttpErrorResponse) => console.log(error)
           });
           */
        }
      })
  }

  //  SERVİS İLE MERKEZİLEŞTİ.
//   openDialog(callBack:()=>void): void {
//     const dialogRef = this.dialog.open(FileUploadDialogComponent, {
//       data: FileUploadState.Yes // dataya yes değeri gönder
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if(result==FileUploadState.Yes) //gelen değer de yesse callback calıstır.
//       {
//         callBack();
//       }

//     });
//   }
// }
}
export class FileUploadOptions{
  controller?:string;
  action?:string;
  queryString?:string;
  explanation?:string;
  accept?:string;
  isAdminPage?:boolean=false;
}
