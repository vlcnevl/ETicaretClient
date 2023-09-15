import { Observable, firstValueFrom } from 'rxjs';
import { HttpClientService } from './../http-client.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationEndpointService {

  constructor(private httpClientService:HttpClientService) { }

  async assignRoleEndpoint(roles:string[],code:string,menu:string,successCallback?:()=>void,errorCallback?:(error)=>void)
  {
    const observable:Observable<any> = this.httpClientService.post({controller:"AuthorizationEndpoints"},{roles:roles,code:code,menu:menu});

    const promiseData = firstValueFrom(observable);
    promiseData.then(s=>successCallback).catch((error)=>errorCallback(error));
     return await promiseData;


   // const promiseData = observable.subscribe({next:successCallback,error:errorCallback()});
  }

  async getRolesEndpoint(code:string,menu:string,successCallback?:()=>void,errorCallback?:()=>void) :Promise<string[]>
  {
    const observable:Observable<any> = this.httpClientService.post({controller:"AuthorizationEndpoints",action:"GetRolesToEndpoint"},{code:code,menu:menu});
    const promiseData = firstValueFrom(observable);
    promiseData.then(s=>successCallback).catch(e=>errorCallback);
    return await promiseData;
  }



}
