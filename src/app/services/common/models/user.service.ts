import { Observable, firstValueFrom } from 'rxjs';
import { User } from 'src/app/entities/User';
import { HttpClientService } from './../http-client.service';
import { Injectable } from '@angular/core';
import { CreateUser } from 'src/app/contracts/user/create_user';


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

   promiseData.then(val=>successCallBack()).catch(error=>errorCallBack(error));
   await promiseData;

  }

}
