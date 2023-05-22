import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { SpinnerType } from 'src/app/base/base.component';
import { _isAuthenticated } from 'src/app/services/common/checkAuth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';


// angular jwt kütüphanesi ile tüm isteklere token gönderebiliyoruz.ayrıca tokeni kontrol edebiliyoruz expire mi değilmi gibi

export const AuthGuard:CanActivateFn =(route:ActivatedRouteSnapshot,state:RouterStateSnapshot)=>{

  const jwtHelper = inject(JwtHelperService);
  const router  = inject(Router);
  const toastrService= inject(CustomToastrService); // angular 16
  const spinner = inject(NgxSpinnerService)

  spinner.show(SpinnerType.BallFall)
  // const token = localStorage.getItem("accessToken");
  // let expired: boolean;

  // try {
  //   expired = jwtHelper.isTokenExpired(token);
  // } catch  {
  //   expired= true;
  // }

  if(!_isAuthenticated)
  {
    router.navigate(["login"],{queryParams:{returnUrl:state.url}})
    toastrService.message("Oturum açmanız gerekiyor.","Yetkisiz Erişim",{messageType:ToastrMessageType.Warning,position:ToastrPosition.TopRight})
  }
  spinner.hide(SpinnerType.BallFall)
  return true;
}



