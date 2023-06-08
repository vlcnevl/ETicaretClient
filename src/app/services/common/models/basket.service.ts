import { Observable, firstValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { ListBasketItem } from 'src/app/contracts/basket/list_basket_item';
import { CreateBasketItem } from 'src/app/contracts/basket/create_basket_item';
import { UpdateBasketItem } from 'src/app/contracts/basket/update_basket_item';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(private httpClientService:HttpClientService) { }

  async get():Promise<ListBasketItem[]>
  {
    const observable:Observable<ListBasketItem[]> = this.httpClientService.get({controller:"baskets"});
    return await firstValueFrom(observable);
  }

  async add(basketItem:CreateBasketItem) : Promise<void> // geri dönüs degeri void
  {
    const observable:Observable<any> = this.httpClientService.post({controller:"baskets"},basketItem);
    return await firstValueFrom(observable);
  }

  async remove(basketItemId:string) : Promise<void>
  {
   const observable:Observable<any> =  this.httpClientService.delete({controller:"baskets"},basketItemId);
   return await firstValueFrom(observable);
  }

  async updateQuantity(basketItem:UpdateBasketItem) : Promise<void>
  {
    const observable:Observable<any> = this.httpClientService.put({controller:"baskets"},basketItem);
    return await firstValueFrom(observable);
  }

}
