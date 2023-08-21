import { Observable, firstValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Menu } from'../../../contracts/applicationConfiguration/menu'

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private httpClientService:HttpClientService) { }

  async getAuthorizeDefinitionEndpoints()
  {
    const observable:Observable<Menu[]> = this.httpClientService.get<Menu[]>({controller:"ApplicationServices"});

   return await firstValueFrom(observable);
  }

}
