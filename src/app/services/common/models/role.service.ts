import { Observable, firstValueFrom } from 'rxjs';
import { HttpClientService } from './../http-client.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private httpClientService:HttpClientService) { }

 async create(roleName:string,successCallback?:()=>void,errorCallback?:(error)=>void)
  {
    const observable:Observable<any> =  this.httpClientService.post({controller:"roles"},{name:roleName});
    const promiseData =firstValueFrom(observable);
    promiseData.then(successCallback).catch(errorCallback);
    return await promiseData;
  }

  async getRoles(page:number,size:number,successCallback?:()=>void,erroCallback?:(error)=>void)
  {
    const observable:Observable<any> = this.httpClientService.get({controller:"roles",queryString: `page=${page}&size=${size}`});
    const promiseData = firstValueFrom(observable);
    promiseData.then(successCallback).catch(erroCallback);
     return await promiseData;
  }

  async updateRole(id:string,roleName:string,successCallback?:()=>void,errorCallback?:(error)=>void)
  {
    const observable:Observable<any> = this.httpClientService.put({controller:"roles"},{id:id,name:roleName});
    const promiseData = firstValueFrom(observable);
    promiseData.then(successCallback).catch(errorCallback);
    return await promiseData;
  }

}
