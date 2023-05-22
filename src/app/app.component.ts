import { Router } from '@angular/router';
import { CheckAuthService } from './services/common/checkAuth.service';
import { Component } from '@angular/core';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ETicaretClient';

  constructor(public checkAuthService:CheckAuthService,private toastrService:CustomToastrService,private router:Router) {
    checkAuthService.identityCheck();
  }

  logout()
  {
    localStorage.removeItem("accessToken");
    this.checkAuthService.identityCheck();
    this.router.navigate([""])
    this.toastrService.message("Oturum Kapatıldı.","Oturum Kapatıldı.",{messageType:ToastrMessageType.Info,position:ToastrPosition.TopRight})
  }
}
