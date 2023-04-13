import { CreateProduct } from 'src/app/contracts/product/create_product';
import { HttpClientService } from './../http-client.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService:HttpClientService) { }

  create(product:CreateProduct,successCalback?:()=> void)
  {
    this.httpClientService.post({controller:"products"},product).subscribe(result=>{successCalback();})
  }


}
