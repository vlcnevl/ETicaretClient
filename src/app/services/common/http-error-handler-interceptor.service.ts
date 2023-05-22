import { CustomToastrService, ToastrMessageType, ToastrPosition } from './../ui/custom-toastr.service';
import { Observable,catchError, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(private toastrService:CustomToastrService) { }

  intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{

    return next.handle(req).pipe(catchError(error =>{

      switch (error.status) {
          case HttpStatusCode.Unauthorized: //401
          this.toastrService.message("Bu işlemi yapmaya yetkin yok.","Yetkisiz İşlem",{messageType:ToastrMessageType.Error,position:ToastrPosition.BottomCenter})
          break;
          case HttpStatusCode.InternalServerError:  //500
          this.toastrService.message("Sunucuya erişilemiyor.","Sunucu Hatası",{messageType:ToastrMessageType.Error,position:ToastrPosition.BottomCenter})
          break;
          case HttpStatusCode.BadRequest:
            this.toastrService.message("Geçersiz istek yapıldı.","Geçersiz İstek",{messageType:ToastrMessageType.Error,position:ToastrPosition.BottomCenter})
          break;
          case HttpStatusCode.NotFound:
            this.toastrService.message("Sayfa bulunamadı.","Sayfa Bulunamadı",{messageType:ToastrMessageType.Error,position:ToastrPosition.BottomCenter})
          break;
        default:
          this.toastrService.message("Beklenmeyen bir hata meydana geldi.","Hata",{messageType:ToastrMessageType.Error,position:ToastrPosition.BottomCenter})
          break;
      }



      return of(error);
    }))
    //catcherror bir rxjs operatörüdür.hatayı bize getirir.
  }
}
