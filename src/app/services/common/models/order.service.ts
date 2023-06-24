import { Observable, firstValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CreateOrder } from 'src/app/contracts/order/createOrder';
import { ListOrder } from 'src/app/contracts/order/listOrder';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClientService:HttpClientService) { }

  async create(order:CreateOrder) : Promise<void>
  {
   const observable:Observable<any> = this.httpClientService.post({controller:"orders"},order);

  await firstValueFrom(observable);

  }

  async read(page: number = 0,size: number = 5,successCallBack?:()=>void,errorCallBack?:(errorMessage:string)=>void): Promise<{ totalCount: number; orders: ListOrder[] }> {

    const observable: Observable<{totalCount:number, orders:ListOrder[]}> = this.httpClientService.get({controller:"orders",queryString:`page=${page}&size=${size}`});
     const data = firstValueFrom(observable);
     data.then(d=> successCallBack()).catch(error => errorCallBack(error))

     return await data;
  }

  async delete(id: string) {
    const deleteObservable: Observable<any> =
      this.httpClientService.delete<any>({ controller: 'orders' }, id);
    await firstValueFrom(deleteObservable);
  }



}
