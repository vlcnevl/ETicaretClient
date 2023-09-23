import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListUser } from 'src/app/contracts/user/list_user';
import { AuthorizeUserDialogComponent } from 'src/app/dialogs/authorize-user-dialog/authorize-user-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService,private alertify: AlertifyService,private userService:UserService,private dialogService:DialogService){
      super(spinner)
    }

  async ngOnInit() {
   await this.getUsers();
  }

  displayedColumns: string[] = ['id','email','nameSurname','username','role'];
  dataSource: MatTableDataSource<ListUser> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getUsers()
  {
    const allUsers:{totalCount:number; users:ListUser[]} = await this.userService.getAllUsers(this.paginator ? this.paginator.pageIndex: 0,this.paginator ? this.paginator.pageSize :5 ,
      () => {
        this.hideSpinner(SpinnerType.BallNewton);
      },
      (message) => {
        this.alertify.message(message, {
          messageType: MessageType.Error,
          position: Position.TopRight,
        });
      }
    );

    this.dataSource = new MatTableDataSource<ListUser>(allUsers.users);
    this.paginator.length = allUsers.totalCount;
  }

  async pageChanged()
  {
    await this.getUsers();
  }

  assignRole(id:string)
  {
    this.dialogService.openDialog({
      componentType:AuthorizeUserDialogComponent,
      data:id,
      options:{
        width:"750px"
      },
      afterClosed() {

      },
    })
  }


}
