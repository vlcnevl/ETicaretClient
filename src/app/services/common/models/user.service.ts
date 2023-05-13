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

 async create(user:User,callBack?:() => void) : Promise<CreateUser>
  {//generic yapılanma . user nesnesini postta gönderdik. backendden cevap olarak farkli türden olan createuser nesnesi aldık.

   const observable:Observable<User | CreateUser> = this.httpClient.post<User | CreateUser>({controller:"users"},user);
   const createUser:CreateUser =  await firstValueFrom(observable) as CreateUser;
    callBack();
    return createUser;
  }

  async login(usernameOrEmail:string,password:string,callBack?:()=>void) : Promise<void>
  {
     const observable:Observable<any> = this.httpClient.post({controller:"users",action:"login"},{usernameOrEmail,password});
      await firstValueFrom(observable);
      callBack();
  }

}
