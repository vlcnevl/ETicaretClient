import { Observable, firstValueFrom } from 'rxjs';
import { User } from 'src/app/entities/User';
import { HttpClientService } from './../http-client.service';
import { Injectable } from '@angular/core';
import { CreateUser } from 'src/app/contracts/user/create_user';
import { ListUser } from 'src/app/contracts/user/list_user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClientService) { }

 async create(user:User) : Promise<CreateUser>
  {//generic yapılanma . user nesnesini postta gönderdik. backendden cevap olarak farkli türden olan createuser nesnesi aldık.
   const observable:Observable<CreateUser | User> = this.httpClient.post<CreateUser | User>({controller:"users"},user);
    return await firstValueFrom(observable) as CreateUser;
  }

  async updatePassword(userId:string,resetToken:string, password:string,passwordConfirm:string,successCallBack?:()=>void
  ,errorCallBack?:(error)=>void)
  {
   const observable:Observable<any> = this.httpClient.post({controller:"users",action:"update-password"},{userId:userId,resetToken:resetToken,password:password,passwordConfirm:passwordConfirm})
   const promiseData : Promise<any> =  firstValueFrom(observable);

   promiseData.then(()=>successCallBack()).catch(error=>errorCallBack(error));
   await promiseData;

  }

  async getAllUsers(page:number = 0,size:number = 5,successCallBack?:()=>void,errorCallBack?:(errorMessage:string)=>void) : Promise<{totalCount:number,users:ListUser[]}>
  {
   const observable:Observable<{totalCount:number,users:ListUser[]}> = this.httpClient.get({controller:"users",queryString:`page${page}&${size}`});
   const data = firstValueFrom(observable);
   data.then(()=>successCallBack).catch(error=>errorCallBack(error));
   return await data;
  }

  async assginRoleToUser(id:string,roles:string[],successCallBack?:()=>void,errorCallBack?:(error)=>void)
  {
    const observable:Observable<any> = this.httpClient.post({controller:"users",action:"assign-role-to-user"},{userId:id,roles:roles});
    const promiseData = firstValueFrom(observable);
    promiseData.then(()=>successCallBack).catch(error=>errorCallBack(error));
    return await promiseData;
  }

 async getRolesToUser(id:string,successCallback?:()=>void,errorCallBack?:(error)=>void) : Promise<string[]>
  {
    const observable:Observable<{userRoles:string[]}> = this.httpClient.get({controller:"users",action:"get-roles-to-user"},id);
    const promiseData = firstValueFrom(observable);
    promiseData.then(()=>successCallback()).catch(error=>errorCallBack(error));
    return (await promiseData).userRoles; // string dizisi
  }

}
