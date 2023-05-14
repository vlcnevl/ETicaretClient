import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { UserService } from 'src/app/services/common/models/user.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {
  constructor(private formBuilder:FormBuilder,private userService:UserService,spinner:NgxSpinnerService,private toastrService:CustomToastrService){
    super(spinner)
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
    await this.userService.login(data.usernameOrEmail,data.password,
      ()=>{this.hideSpinner(SpinnerType.BallFall),
        this.toastrService.message(`Giriş başarılı. Hoşgeldin ${data.usernameOrEmail}`,"Giriş Başarılı",{messageType:ToastrMessageType.Success, position:ToastrPosition.TopRight});
      },
      ()=>
      {
        this.hideSpinner(SpinnerType.BallFall)
        this.toastrService.message("Giriş başarısız.","Giriş Başarısız",{messageType:ToastrMessageType.Error, position:ToastrPosition.TopRight});

      }
    );




  }

}
