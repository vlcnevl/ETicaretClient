import { ComponentName, DynamicLoadComponentService } from './services/common/dybamic-load-component.service';
import { Router } from '@angular/router';
import { CheckAuthService } from './services/common/checkAuth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
import { DynamicLoadComponentDirective } from './directives/common/dynamic-load-component.directive';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent{
  title = 'ETicaretClient';

  @ViewChild(DynamicLoadComponentDirective,{static:true})
  dynamicLoadComponentDirective:DynamicLoadComponentDirective;


  constructor(public checkAuthService:CheckAuthService,private toastrService:CustomToastrService,private router:Router,private dynamicComponent:DynamicLoadComponentService) {
    checkAuthService.identityCheck();
  }
  ngOnInit() {
  }

  logout()
  {
    localStorage.removeItem("accessToken");
    this.checkAuthService.identityCheck();
    this.router.navigate([""])
    this.toastrService.message("Oturum Kapatıldı.","Oturum Kapatıldı.",{messageType:ToastrMessageType.Info,position:ToastrPosition.TopRight})
  }

  loadComponent()
  {
    //nesneyi direktifte public yapınca bıurdan ulasabildik
    this.dynamicComponent.loadComponent(ComponentName.BasketsComponent,this.dynamicLoadComponentDirective.viewContainerRef);
  }

}
