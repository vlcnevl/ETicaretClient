import { NgxSpinnerService } from 'ngx-spinner';
import { Component } from '@angular/core';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { BasketService } from 'src/app/services/common/models/basket.service';
import { ListBasketItem } from 'src/app/contracts/basket/list_basket_item';
import { UpdateBasketItem } from 'src/app/contracts/basket/update_basket_item';

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.scss']
})
export class BasketsComponent extends BaseComponent {
  constructor(spinner:NgxSpinnerService,private basketService:BasketService) {
    super(spinner);
  }

  listBasketItem:ListBasketItem[];
  async ngOnInit() {
    this.showSpinner(SpinnerType.BallNewton)
    this.listBasketItem = await this.basketService.get();
    this.hideSpinner(SpinnerType.BallNewton)
  }

 async changeQuantity(event:any)
  {
    this.showSpinner(SpinnerType.BallFall)
    //id html de data-id olarak bildirdiğimiz id nin keyi.burda böyle yakalayabiliyoruz.
   const basketItemId:string = event.target.attirubutes["id"].value;
   const quantity:number = event.target.value;

   const updateItem:UpdateBasketItem = new UpdateBasketItem();
   updateItem.basketItemId = basketItemId;
   updateItem.quantity = quantity;
   await this.basketService.updateQuantity(updateItem);
    this.hideSpinner(SpinnerType.BallFall)
  }



}
