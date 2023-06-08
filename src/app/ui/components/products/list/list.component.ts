import { CustomToastrService, ToastrMessageType, ToastrPosition } from './../../../../services/ui/custom-toastr.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ListProduct } from 'src/app/contracts/product/list_product';
import { ProductService } from 'src/app/services/common/models/product.service';
import { FileService } from 'src/app/services/common/models/file.service';
import { BaseUrl } from 'src/app/contracts/baseUrl';
import { BasketService } from 'src/app/services/common/models/basket.service';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { CreateBasketItem } from 'src/app/contracts/basket/create_basket_item';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit{

constructor(private productService:ProductService,private activatedRoute:ActivatedRoute,private fileService:FileService,private basketService:BasketService, spinner:NgxSpinnerService,private toastrService:CustomToastrService)
{
  super(spinner)
}


//sayfalama değişkenleri  ...48,49,50,51,52,53...
 currentPageNo:number;
 totalProductCount:number;
 totalPageCount:number;
 pageSize:number = 12;
 pageList:number[];

 products:ListProduct[];

 baseUrl:BaseUrl;

 async ngOnInit() {
    this.activatedRoute.params.subscribe(async params => {
    this.currentPageNo = parseInt(params["pageNo"] ?? 1);

    this.baseUrl = await this.fileService.getBaseStroageUrl();

    const data:{totalCount:number,products:ListProduct[]} = await this.productService.read(this.currentPageNo-1,this.pageSize,()=>{},error=>{});
    this.products = data.products;

    this.products = this.products.map<ListProduct>(p=>{
      const listProduct:ListProduct ={
        id:p.id,
        price:p.price,
        stock:p.stock,
        name:p.name,
        createdDate:p.createdDate,
        updatedDate:p.updatedDate,
        description:p.description,
        productImageFiles:p.productImageFiles,
        imagePath: p.productImageFiles.length ? p.productImageFiles.find(p=>p.showcase).path : "", // vitrin resmini pathe alabilmek için mapledik.
      };
      return listProduct;
    });





    // pagination islemleri önemli.
    this.totalProductCount=data.totalCount;
    this.totalPageCount = Math.ceil(this.totalProductCount/this.pageSize);

    this.pageList=[];//sayfa yenilendiğinde sıfırla

    if(this.currentPageNo-3<=0) // ücten kücükse ilk 7 sayfayı direk olarak görmesi için
    {
      for (let i = 1; i <=7; i++) {
        this.pageList.push(i);
      }
    }
    else if(this.currentPageNo+3 >=this.totalPageCount) // sayfanın sonundaysa son 7 sayfayı görebilmesi için
    {
      for (let i = this.totalPageCount-6; i <=this.totalPageCount; i++) {
        this.pageList.push(i);
      }
    }
    else
    {
      for (let i = this.currentPageNo-3; i <=this.currentPageNo+3; i++) { // ortalardaysak varolan sayfanın 3 ilerisi 3 gerisi görünsün
        this.pageList.push(i);
      }
    }
  })

  }


 async addToBasket(product:ListProduct)
  {
    this.showSpinner(SpinnerType.BallFall)
    let _basketItem:CreateBasketItem = new CreateBasketItem();

    _basketItem.productId = product.id;
    _basketItem.quantity = 1;

    await this.basketService.add(_basketItem);
    this.hideSpinner(SpinnerType.BallFall)
    this.toastrService.message("Ürün basarıyla sepete eklendi","Ürün Ekleme Başarılı",{messageType:ToastrMessageType.Success,position:ToastrPosition.TopRight})
  }




}
