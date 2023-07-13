import { AuthService } from './../../../services/common/models/auth.service';
import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent extends BaseComponent {

  constructor(private authService:AuthService,private toastrService:CustomToastrService,spinner:NgxSpinnerService){
    super(spinner)
  }
  forgotPassword(email:string)
  {
    this.showSpinner(SpinnerType.SquareJellyBox);
    this.authService.resetPassword(email,()=>{
      this.hideSpinner(SpinnerType.SquareJellyBox);
      this.toastrService.message("Şifre Yenileme maili tarafınıza gönderildi.","Şifre Yenileme",{messageType:ToastrMessageType.Success,position:ToastrPosition.TopRight})
    });
  }

}
