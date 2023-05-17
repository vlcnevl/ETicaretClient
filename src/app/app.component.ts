import { Router } from '@angular/router';
import { AuthService } from './services/common/auth.service';
import { Component } from '@angular/core';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ETicaretClient';

  constructor(public authService:AuthService,private toastrService:CustomToastrService,private router:Router) {
    authService.identityCheck();
  }

  logout()
  {
    localStorage.removeItem("accessToken");
    this.authService.identityCheck();
    this.router.navigate([""])
    this.toastrService.message("Oturum Kapatıldı.","Oturum Kapatıldı.",{messageType:ToastrMessageType.Info,position:ToastrPosition.TopRight})
  }
}
