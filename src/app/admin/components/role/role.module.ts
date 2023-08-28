import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleComponent } from './role.component';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { DialogModule } from '@angular/cdk/dialog';
import { DeleteModule } from 'src/app/directives/admin/delete.module';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';



@NgModule({
  declarations: [
    RoleComponent,
    CreateComponent,
    ListComponent
  ],
  imports: [
    CommonModule,RouterModule.forChild([{path:"",component:RoleComponent}]),
    MatSidenavModule,MatInputModule,MatButtonModule,MatTableModule,MatPaginatorModule,MatIconModule,DialogModule,DeleteModule
  ]
})
export class RoleModule { }
