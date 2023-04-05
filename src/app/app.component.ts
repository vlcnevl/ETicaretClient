import { Component } from '@angular/core';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ETicaretClient';



  constructor(private toastr:CustomToastrService) {

    this.toastr.message("veli","can",{messageType:ToastrMessageType.Error,position:ToastrPosition.BottomLeft})
  }
}
