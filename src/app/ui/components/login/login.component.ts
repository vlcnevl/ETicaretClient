import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private formBuilder:FormBuilder){}

  form:FormGroup;
  ngOnInit(): void {
    this.form = new FormGroup({
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
