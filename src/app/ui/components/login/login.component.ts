import { AuthService } from './../../../services/common/models/auth.service';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { CheckAuthService } from '../../../services/common/checkAuth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { UserService } from 'src/app/services/common/models/user.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {
  constructor(private formBuilder:FormBuilder,private authService:AuthService,spinner:NgxSpinnerService,private toastrService:CustomToastrService,private checkAuthService:CheckAuthService,private activatedRoute:ActivatedRoute,private router:Router,private socialAuthService: SocialAuthService){
    super(spinner)
    socialAuthService.authState.subscribe(async (user:SocialUser)=>{
     // console.log(user);
      this.showSpinner(SpinnerType.BallNewton);
     await authService.googleLogin(user,()=>{
        this.hideSpinner(SpinnerType.BallNewton)
        this.toastrService.message(`Giriş başarılı. Hoşgeldin ${user.name}`,"Giriş Başarılı",{messageType:ToastrMessageType.Success, position:ToastrPosition.TopRight});
        this.checkAuthService.identityCheck();
      },()=>{
        this.hideSpinner(SpinnerType.BallNewton)
        this.toastrService.message("Giriş başarısız.","Giriş Başarısız",{messageType:ToastrMessageType.Error, position:ToastrPosition.TopRight});
      })
    })


  }

  form:FormGroup;
  ngOnInit(): void {
    this.form = this.formBuilder.group({ // bu daha çok kullanılan versiyon
      usernameOrEmail: ["",[Validators.required,Validators.minLength(3)]],
      password:["",[Validators.required]],
    });
  }


  submitted:boolean = false;
  get component()
  {
    return this.form.controls;
  }

  async onSubmit(data:any)
  {
    this.submitted=true;
    if (this.form.invalid)
    return;
    this.showSpinner(SpinnerType.BallFall);
    await this.authService.login(data.usernameOrEmail,data.password,
      ()=>{
        this.toastrService.message(`Giriş başarılı. Hoşgeldin ${data.usernameOrEmail}`,"Giriş Başarılı",{messageType:ToastrMessageType.Success, position:ToastrPosition.TopRight});
        this.checkAuthService.identityCheck();

        this.activatedRoute.queryParams.subscribe(params=>{ // bizi bir yere girerken logine atıyorsa login yaptıktan sonra o sayfaya tekrar gönderir
         const returnUrl:string =  params["returnUrl"]
          if(returnUrl)
            this.router.navigate([returnUrl])
        });

        this.hideSpinner(SpinnerType.BallFall);
      },
      ()=>
      {
        this.hideSpinner(SpinnerType.BallFall)
        this.toastrService.message("Giriş başarısız.","Giriş Başarısız",{messageType:ToastrMessageType.Error, position:ToastrPosition.TopRight});

      }
    );
  }

}
