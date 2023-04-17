import { NgxSpinnerService } from 'ngx-spinner';
export class BaseComponent { // serviste de yapılabilir.

constructor(private spinner:NgxSpinnerService) {}

  showSpinner(spinnerType:SpinnerType)
  {
    this.spinner.show(spinnerType);

    setTimeout(() => this.hideSpinner(spinnerType), 1000);

  }

  hideSpinner(spinnerType:SpinnerType)
  {
    this.spinner.hide(spinnerType);
  }

}


export enum SpinnerType{
  SquareJellyBox = "s1",
  BallFall = "s1",
  BallNewton="s3"
}
