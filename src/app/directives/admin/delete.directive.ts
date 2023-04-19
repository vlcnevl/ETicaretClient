import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientService } from './../../services/common/http-client.service';
import { Directive, ElementRef, Renderer2, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { DeleteDialogComponent, DeleteState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';


declare var $:any;

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(private element:ElementRef, private _renderer:Renderer2,private httpClientService :HttpClientService,private spinner:NgxSpinnerService,public dialog: MatDialog,private alertify:AlertifyService,private dialogService:DialogService) {

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
    @Input() controller:string;
    @Output() callBack : EventEmitter<any> = new EventEmitter();


    @HostListener("click") // eklediğimiz yerde tıklanma olunca tetiklenir.
   async onClick()
    {
      this.dialogService.openDialog({
          componentType:DeleteDialogComponent,
          data:DeleteState.Yes,
        afterClosed:async ()=>{
          this.spinner.show(SpinnerType.BallNewton);
          const td:HTMLTableCellElement = this.element.nativeElement;
          await this.httpClientService.delete({controller:this.controller},this.id).subscribe(data=> {
            $(td.parentElement).animate({opacity:0,left:"+=50",height:"toggle"},700,()=> {this.callBack.emit(); this.spinner.hide(SpinnerType.BallNewton)})
            this.alertify.message("ürün başarıyla silindi.",{messageType:MessageType.Success,position:Position.TopRight})
          },(errorResponse:HttpErrorResponse)=>{
            this.spinner.hide(SpinnerType.BallNewton)
            this.alertify.message("ürün silinirken hata oluştu.",{messageType:MessageType.Error,position:Position.TopRight})

          });

        }
      } )

    }


    // openDialog(callBack:()=>void): void {
    //   const dialogRef = this.dialog.open(DeleteDialogComponent, {
    //     data: DeleteState.Yes

    //   });

    //   dialogRef.afterClosed().subscribe(result => {
    //     if(result==DeleteState.Yes)
    //     {
    //       callBack();
    //     }

    //   });
    // }
}


