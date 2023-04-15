import { Directive, ElementRef, Renderer2, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { ProductService } from 'src/app/services/common/models/product.service';

declare var $:any;

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(private element:ElementRef, private _renderer:Renderer2,private productService :ProductService,private spinner:NgxSpinnerService) {

        const matIcon = document.createElement('mat-icon');
         matIcon.setAttribute("style","color:gray; cursor:pointer; margin-top:5px;");
         matIcon.classList.add('material-icons');
         matIcon.innerHTML = 'delete';
         matIcon.setAttribute("id","icon");
         matIcon.addEventListener("mouseover",()=>{
          matIcon.style.color="#f50057";
          matIcon.style.transform="scale(1.2)"
         })

         matIcon.addEventListener("mouseout",()=>{
          matIcon.style.color="gray";
          matIcon.style.transform="scale(1)"
         })


        _renderer.appendChild(element.nativeElement,matIcon);
  }

    @Input() id:string;
    @Output() callBack : EventEmitter<any> = new EventEmitter();


    @HostListener("click") // eklediğimiz yerde tıklanma olunca tetiklenir.
   async onClick()
    {
      this.spinner.show(SpinnerType.BallNewton);
       const td:HTMLTableCellElement = this.element.nativeElement;
       await this.productService.delete(this.id);
       $(td.parentElement).fadeOut(1000,()=>{this.callBack.emit(); this.spinner.hide(SpinnerType.BallNewton)});
    }


}


