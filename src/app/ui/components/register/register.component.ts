import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CreateUser } from 'src/app/contracts/user/create_user';
import { User } from 'src/app/entities/User';
import { UserService } from 'src/app/services/common/models/user.service';
import { ToastrPosition } from 'src/app/services/ui/custom-toastr.service';
import { ToastrMessageType } from 'src/app/services/ui/custom-toastr.service';
import { CustomToastrService } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends BaseComponent implements OnInit {

  constructor(private formBuilder:FormBuilder,private userService:UserService,private customToastrService:CustomToastrService,spinner:NgxSpinnerService)
  {
    super(spinner);
  }


  form : FormGroup;
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nameSurname:["",[Validators.required,Validators.maxLength(30),Validators.minLength(3)]],
      username:["",[Validators.required,Validators.maxLength(30),Validators.minLength(3)]],
      email:["",[Validators.required,Validators.maxLength(30),Validators.minLength(3),Validators.email]],
      password:["",[Validators.required,Validators.maxLength(30),Validators.minLength(3)]],
      confirmPassword:["",[Validators.required,Validators.maxLength(30),Validators.minLength(3)]]
    },{validators:(group:AbstractControl):ValidationErrors | null=>{

      let password = group.get("password").value;
      let confirmPassword = group.get("confirmPassword").value;

      return password === confirmPassword ? null : {notSame:true};
    }})
  }

  submitted:boolean=false;
  get component() // c#daki prop yapısı gibi
   {
    return this.form.controls;
   }

  async onSubmit(user:User)
  {
    this.submitted=true;
    if (this.form.invalid)
    return;
    this.showSpinner(SpinnerType.BallNewton);
    const result:CreateUser =   await this.userService.create(user,()=> this.hideSpinner(SpinnerType.BallNewton));
    if(result.succeded)
      this.customToastrService.message(result.message,"Kullanıcı kayıt başarılı",{messageType:ToastrMessageType.Success,position:ToastrPosition.TopRight})
    else
      this.customToastrService.message(result.message,"Kullanıcı kaydı başarısız",{messageType:ToastrMessageType.Error, position:ToastrPosition.TopRight})
  }

}
