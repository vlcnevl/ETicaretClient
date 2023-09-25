import { Observable, firstValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class QrCodeService {

  constructor(private httpClientService:HttpClientService) { }

  async getQrCode(id:string)
  {
    const observable:Observable<any> = this.httpClientService.get({controller:"products",action:"qrcode",responseType:"blob"},id);
    const promiseData = firstValueFrom(observable)
    return await promiseData;
  }

}
