import { HttpErrorResponse } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CreateOrder } from 'src/app/contracts/order/createOrder';
import { ListOrder } from 'src/app/contracts/order/listOrder';
import { SingleOrder } from 'src/app/contracts/order/singleOrder';

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

  async getById(id:string,successCallBack?:()=>void,errorCallBack?:(errorMessage:string)=>void) : Promise<SingleOrder>
  {
    const observable:Observable<SingleOrder> = this.httpClientService.get<SingleOrder>({controller:"orders"},id); // callback func lari tetiklemek için bu model işe yarıyor.
    const promiseData = firstValueFrom(observable);

    promiseData.then(data=>successCallBack()).catch(error=> errorCallBack(error));
    return await promiseData;
  }

  async completeOrder(id:string)
  {
    const observable:Observable<any> = this.httpClientService.get<any>({controller:"orders",action:"complete-order"},id);
    await firstValueFrom(observable);
  }

}
