import { NgxSpinnerService } from 'ngx-spinner';
import { Component } from '@angular/core';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent extends BaseComponent {
  constructor(spinner:NgxSpinnerService) {
    super(spinner);
  }
  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallNewton)
  }

}
