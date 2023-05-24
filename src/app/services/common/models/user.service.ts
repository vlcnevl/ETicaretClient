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
}
