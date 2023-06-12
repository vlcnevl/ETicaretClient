import { CreateComponent } from './../../admin/components/products/create/create.component';
import { BaseComponent } from './../../base/base.component';
import { Injectable, inject, Component, ViewContainerRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
//dynamic load örnnek olarak yeni gelen bir mesajı gösterme gibi
//istediğimz an istediğimiz yerde componenti yüklememize olanak sağlar.

//viewcontainerRef dinamik yüklenecek componenti içinde barındırır.Her yükleme öncesi viewi clear etmek gerekir.

export class DynamicLoadComponentService {

  constructor() { }

  async loadComponent(component:ComponentName,viewContainerRef:ViewContainerRef)
  {
    let _component:any = null;
    switch (component)
    {
      case ComponentName.BasketsComponent:
      _component = (await import("../../ui/components/baskets/baskets.component")).BasketsComponent
      break;
    }

    viewContainerRef.clear;
   return viewContainerRef.createComponent(_component);
  }

}


export enum ComponentName
{
  BasketsComponent
}
