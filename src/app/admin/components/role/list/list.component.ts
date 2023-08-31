import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListRole } from 'src/app/contracts/roles/list_role';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { RoleService } from 'src/app/services/common/models/role.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit{

  constructor(spinner: NgxSpinnerService,private roleService: RoleService,private alertify: AlertifyService,private dialogService :DialogService) {
    super(spinner);
  }

  displayedColumns: string[] = ['name','update','delete'];
  dataSource: MatTableDataSource<ListRole> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getRoles()
  {
    this.showSpinner(SpinnerType.BallFall)

    const allRoles:{roles:ListRole[],totalCount:number} = await this.roleService.getRoles(this.paginator ? this.paginator.pageIndex:0,this.paginator ? this.paginator.pageSize:5,
      ()=> this.hideSpinner(SpinnerType.BallFall),
      errorMessage=> this.alertify.message(errorMessage,{messageType:MessageType.Error,position:Position.TopRight}))

      this.dataSource = new MatTableDataSource<ListRole>(allRoles.roles);
      this.paginator.length = allRoles.totalCount;
    }

  async pageChanged()
  {
    await this.getRoles();
  }

  async ngOnInit() {
    await this.getRoles();
  }

}
