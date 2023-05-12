import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(){}

  form:FormGroup;
  ngOnInit(): void {
    this.form = new FormGroup({ // bu daha çok kullanılan versiyon
      username:new FormControl("",Validators.required),
      password:new FormControl("",Validators.required)
    });
  }


  submitted:boolean = false;
  get component()
  {
    return this.form.controls;
  }

  onSubmit(data:any)
  {
    console.log();

    this.submitted=true;
    if (this.form.invalid)
    return;

  }

}
