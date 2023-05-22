import { Observable, firstValueFrom } from 'rxjs';
import { SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClientService) { }

  async login(usernameOrEmail:string,password:string,successCallback?:()=>void,errorCallback?:()=>void) : Promise<any>
  {  // anyde gönderebilirim token de alabilirim.
     const observable:Observable<any | TokenResponse> = this.httpClient.post<any | TokenResponse>({controller:"auth",action:"login"},{usernameOrEmail,password});
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


  async googleLogin(user:SocialUser,successCallback?:()=> void,errorCallback?:()=>void):Promise<any>
  {
    const observable:Observable<SocialUser |TokenResponse> = this.httpClient.post<SocialUser | TokenResponse>({controller:"auth",action:"GoogleLogin"},user);
    const tokenResponse:TokenResponse = await firstValueFrom(observable) as TokenResponse;

    if(tokenResponse)
    {
      localStorage.setItem("accessToken",tokenResponse.token.accessToken);
      successCallback();
    }
    else
      errorCallback();
  }


}
