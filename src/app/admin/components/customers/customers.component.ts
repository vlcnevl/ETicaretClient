import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit, Output } from '@angular/core';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent extends BaseComponent implements OnInit {

  constructor(spinner:NgxSpinnerService) {
    super(spinner);
  }
  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallNewton)
  }



  @Output() fileUploadOptions : Partial<FileUploadOptions> = {
    action:"upload",
    controller:"products",
    explanation:"resimleri seçin...",
    isAdminPage:true,
    accept:".png,.jpg,.jpeg"
  } // burdan htmldeki selectore ordan diğer componente gidecek

}
