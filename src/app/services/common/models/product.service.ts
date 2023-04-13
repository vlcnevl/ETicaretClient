import { CreateProduct } from 'src/app/contracts/product/create_product';
import { HttpClientService } from './../http-client.service';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClientService: HttpClientService) {}

  create(product: CreateProduct,successCalback?: () => void,errorCallback?: (message:string) => void
  ) {
    this.httpClientService.post({ controller: 'products' }, product).subscribe(result => {successCalback(); },
      (errorResponse: HttpErrorResponse) => {
        const _error:Array<{key:string,value:Array<string>}>  = errorResponse.error;  // kendi özel veri tipimizi olusturduk hata koduna karsı hata mesajlarını çektik

        let message ="";
          debugger;
        _error.forEach((v,index)=>{
          v.value.forEach((_v,index)=>{
            message += `${_v} <br>`;
          })
        })
        errorCallback(message);
      }
    );
  }
}
