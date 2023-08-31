import { CreateProduct } from 'src/app/contracts/product/create_product';
import { HttpClientService } from './../http-client.service';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ListProduct } from 'src/app/contracts/product/list_product';
import { Observable, firstValueFrom } from 'rxjs';
import { ListProductImage } from 'src/app/contracts/product/list_product_image';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClientService: HttpClientService) {}

  create(
    product: CreateProduct,
    successCalback?: () => void,
    errorCallback?: (message: string) => void
  ) {
    this.httpClientService.post({ controller: 'products' }, product).subscribe(
      (result) => {
        successCalback();
      },
      (errorResponse: HttpErrorResponse) => {
        const _error: Array<{ key: string; value: Array<string> }> =
          errorResponse.error; // kendi özel veri tipimizi olusturduk hata koduna karsı hata mesajlarını çektik
        let message = '';
        debugger;
        _error.forEach((v, index) => {
          v.value.forEach((_v, index) => {
            message += `${_v} <br>`;
          });
        });
        errorCallback(message);
      }
    );
  }
  // güncellee
  async read(page: number = 0,size: number = 5,successCalback?: () => void,errorCallback?: (message: string) => void): Promise<{ totalCount: number; products: ListProduct[] }> {

    // const data: Promise<{ totalCount: number; products: ListProduct[] }> =
    //   this.httpClientService.get<{ totalCount: number; products: ListProduct[] }>({
    //       controller: 'products',
    //       queryString: `page=${page}&size=${size}`,
    //     }).toPromise();

    // data
    //   .then((d) => successCalback())
    //   .catch((httpError: HttpErrorResponse) => {
    //     errorCallback(httpError.message);
    //   });
    // return await data; // eski hali


//yeni hali
    const observable:Observable<{ totalCount: number; products: ListProduct[] }> = this.httpClientService.get({controller:"products",queryString: `page=${page}&size=${size}`,});
    const promiseData = firstValueFrom(observable);
    promiseData.then(successCalback).catch((httpError:HttpErrorResponse)=>{errorCallback(httpError.message)});
    return await promiseData;
  }

  async delete(id: string) {
    const deleteObservable: Observable<any> =
      this.httpClientService.delete<any>({ controller: 'products' }, id);
    await firstValueFrom(deleteObservable);
  }

  async readImage(id: string,successCalback?: () => void): Promise<ListProductImage[]> {
    const getObservable: Observable<ListProductImage[]> =
      this.httpClientService.get<ListProductImage[]>(
        { action: 'getproductimages', controller: 'products' },id);

    const images: ListProductImage[] = await firstValueFrom(getObservable);
    successCalback();
    return images;
  }

  async deleteImage(id:string,imageId:string,successCalback:()=> void){
    const deleteObservable =  this.httpClientService.delete({
      action:"deleteproductimage",
      controller:"products",
      queryString:`imageId=${imageId}`, // query string olarak gidiyor.
    },id); // route parameter olarak gidiyor.

    await firstValueFrom(deleteObservable);
    successCalback();
  }


  async changeShowcaseImage(imageId:string,productId:string,successCalback?:()=>void): Promise<void>
  {
   const changeShowcaseImageObservable =  this.httpClientService.get({controller:"products",action:"ChangeShowcaseImage",queryString:`imageId=${imageId}&productId=${productId}`})
    await firstValueFrom(changeShowcaseImageObservable);
    successCalback();
  }


}
