import { Observable, firstValueFrom } from 'rxjs';
import { User } from 'src/app/entities/User';
import { HttpClientService } from './../http-client.service';
import { Injectable } from '@angular/core';
import { CreateUser } from 'src/app/contracts/user/create_user';
import { Token } from 'src/app/contracts/token/token';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';


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

  async login(usernameOrEmail:string,password:string,successCallback?:()=>void,errorCallback?:()=>void) : Promise<any>
  {  // anyde gönderebilirim token de alabilirim.
     const observable:Observable<any | TokenResponse> = this.httpClient.post<any | TokenResponse>({controller:"users",action:"login"},{usernameOrEmail,password});
     const tokenResponse:TokenResponse = await firstValueFrom(observable) as TokenResponse;

     if(tokenResponse)
     {
      localStorage.setItem("accessToken",tokenResponse.token.accessToken);
     // localStorage.setItem("expiration",token.expiration.toString());
      successCallback();
     }
     else
      errorCallback();
  }

}
