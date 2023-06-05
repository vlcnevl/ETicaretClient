import { TokenResponse } from './../../../contracts/token/tokenResponse';
import { Observable, firstValueFrom } from 'rxjs';
import { SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { BaseUrl } from 'src/app/contracts/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private httpClient:HttpClientService) { }

  async getBaseStroageUrl() : Promise<BaseUrl>
  {
    const observable:Observable<BaseUrl> = this.httpClient.get<BaseUrl>({controller:"files"});
    return await firstValueFrom(observable)
  }

}
