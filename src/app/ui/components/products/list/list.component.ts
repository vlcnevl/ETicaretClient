import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ListProduct } from 'src/app/contracts/product/list_product';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit{

constructor(private productService:ProductService,private activatedRoute:ActivatedRoute) {}
//sayfalama değişkenleri  ...48,49,50,51,52,53...
 currentPageNo:number;
 totalProductCount:number;
 totalPageCount:number;
 pageSize:number = 12;
 pageList:number[];

 products:ListProduct[];

  ngOnInit() {
    this.activatedRoute.params.subscribe(async params => {
    this.currentPageNo = parseInt(params["pageNo"] ?? 1);

    const data:{totalCount:number,products:ListProduct[]} = await this.productService.read(this.currentPageNo-1,this.pageSize,()=>{},error=>{});
    this.products = data.products;


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


}
