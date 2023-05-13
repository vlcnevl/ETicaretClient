import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {
  constructor(private userService:UserService,spinner:NgxSpinnerService){
    super(spinner)
  }

  form:FormGroup;
  ngOnInit(): void {
    this.form = new FormGroup({ // bu daha çok kullanılan versiyon
      usernameOrEmail:new FormControl("",Validators.required),
      password:new FormControl("",Validators.required)
    });
  }


  submitted:boolean = false;
  get component()
  {
    return this.form.controls;
  }

  async onSubmit(data:any)
  {
    this.showSpinner(SpinnerType.BallFall);
    await this.userService.login(data.usernameOrEmail,data.password,()=>this.hideSpinner(SpinnerType.BallFall));

    this.submitted=true;
    if (this.form.invalid)
    return;

  }

}
