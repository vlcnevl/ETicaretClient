import { NgxSpinnerService } from 'ngx-spinner';
import { Component } from '@angular/core';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { BasketService } from 'src/app/services/common/models/basket.service';
import { ListBasketItem } from 'src/app/contracts/basket/list_basket_item';
import { UpdateBasketItem } from 'src/app/contracts/basket/update_basket_item';
import { OrderService } from 'src/app/services/common/models/order.service';
import { CreateOrder } from 'src/app/contracts/order/createOrder';
import { CustomToastrService, ToastrMessageType, ToastrOptions, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';
import { Router } from '@angular/router';

declare var $:any; //jquery

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.scss']
})
export class BasketsComponent extends BaseComponent {
  constructor(spinner:NgxSpinnerService,private basketService:BasketService,private orderService:OrderService,private toastrService:CustomToastrService,private router:Router) {
    super(spinner);
  }

  listBasketItem:ListBasketItem[];
  async ngOnInit() {
    this.showSpinner(SpinnerType.BallNewton)
    this.listBasketItem = await this.basketService.get();
    const quantity:number = this.listBasketItem.length;
    localStorage.setItem("basketQuantity",quantity.toString())
    this.hideSpinner(SpinnerType.BallNewton)
  }

 async changeQuantity(event:any,id:string)
  {
   this.showSpinner(SpinnerType.BallFall)
   const quantity:number = event.target.value;
   const updateItem:UpdateBasketItem = new UpdateBasketItem();
   updateItem.basketItemId = id;
   updateItem.quantity = quantity;
   await this.basketService.updateQuantity(updateItem);
   this.hideSpinner(SpinnerType.BallFall)
  }

  async deleteBasketItem(basketItemId:string)
  {
   this.showSpinner(SpinnerType.BallFall)
   await this.basketService.remove(basketItemId)
    $("." + basketItemId).fadeOut(500,()=>this.hideSpinner(SpinnerType.BallFall)); //class değeri jqueryde böyle alınıyormıs.

  }

  async completeOrder()
  {
    this.showSpinner(SpinnerType.BallFall)
    const order:CreateOrder = new CreateOrder();
    order.address = "Ankara/Çubuk"
    order.description = "Evde yoksam komsuya birak."
   await this.orderService.create(order)
   this.hideSpinner(SpinnerType.BallFall)
   this.toastrService.message("Sipariş başarıyla oluşturuldu.","Sipariş Oluşturuldu",{messageType:ToastrMessageType.Success,position:ToastrPosition.TopRight})

    this.router.navigate(["/"]); // ana sayfaya yönlendirme
  }

}
