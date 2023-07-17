import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AuthService } from 'src/app/services/common/models/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/common/models/user.service';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent extends BaseComponent implements OnInit{

  constructor(spinner:NgxSpinnerService,private authService:AuthService,private activatedRoute:ActivatedRoute,private userService:UserService,private alertifyService:AlertifyService,private router:Router) {
    super(spinner);
  }

  state:any;

  ngOnInit() {
    this.showSpinner(SpinnerType.BallNewton);
    this.activatedRoute.params.subscribe({next:async params=>{
      const userId:string = params["userId"];
      const resetToken:string = params["resetToken"];
    this.state = await this.authService.verifyResetPasswordToken(resetToken,userId,()=>{
          this.hideSpinner(SpinnerType.BallNewton);
      });
    }})
  }

  updatePassword(password:string,passwordConfirm:string)
  {
    this.showSpinner(SpinnerType.BallFall);
    if(password!=passwordConfirm){
      this.alertifyService.message("Lütfen şifrenizi doğrulayınız",{messageType:MessageType.Notify,position:Position.TopRight})
      return;
    }

    this.activatedRoute.params.subscribe({next:async params=>{
      const userId:string = params["userId"];
      const resetToken:string = params["resetToken"];
  await this.userService.updatePassword(userId,resetToken,password,passwordConfirm,()=>{
      this.hideSpinner(SpinnerType.BallFall);
      this.router.navigate(["/login"]);
      },error=>{
       console.log(error);

      });

    }})

  }

}
