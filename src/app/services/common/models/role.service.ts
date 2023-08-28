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
   return await firstValueFrom(observable) as {succeded:boolean}
  }

  getRoles()
  {
    const observable:Observable<any> = this.httpClientService.get({controller:"roles"});
  }
}
