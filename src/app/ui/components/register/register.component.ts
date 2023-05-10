import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder:FormBuilder) {}


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

  onSubmit(data:any)
  {
    this.submitted=true;
    if (this.form.invalid)
    return;
  }


}
