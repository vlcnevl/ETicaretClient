import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckAuthService {

  constructor(private jwtHelper:JwtHelperService) { }


  identityCheck()
  {
    const token = localStorage.getItem("accessToken");
    let expired:boolean;
    try {
      expired = this.jwtHelper.isTokenExpired(token);
    } catch  {
      expired= true;
    }
    _isAuthenticated = token!=null && !expired;
  }

  get isAuthenticated():boolean
  {
    return _isAuthenticated;
  }

}

export let _isAuthenticated:boolean; // bu değişkende kontrolleri sağlayacağız
