import { CustomToastrService, ToastrMessageType, ToastrPosition } from './../../ui/custom-toastr.service';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { HttpClientService } from '../http-client.service';
import { AlertifyService, MessageType, Position } from '../../admin/alertify.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

constructor(private httpClientService:HttpClientService,private alertifyService:AlertifyService,private customToastrService:CustomToastrService) {}

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

    this.httpClientService.post(
      {controller:this.options.controller,
        action:this.options.action,
        queryString:this.options.queryString,
        headers: new HttpHeaders({"responseType":"blob"})
     },fileData).subscribe(data => {

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

     });
      /*
      rxjs güncellemesi ile gelen yenilik
     this.httpClientService.get({controller:"products"}).subscribe({
     next: data=>{console.log(data)},
     error: (error:HttpErrorResponse) => console.log(error)
     });
     */


  }
}


export class FileUploadOptions{
  controller?:string;
  action?:string;
  queryString?:string;
  explanation?:string;
  accept?:string;
  isAdminPage?:boolean=false;
}
