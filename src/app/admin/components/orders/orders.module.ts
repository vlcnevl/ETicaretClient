import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { DeleteModule } from 'src/app/directives/admin/delete.module';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    OrdersComponent,
    ListComponent,
  ],
  imports: [
    CommonModule,RouterModule.forChild([{path:"",component:OrdersComponent}]),MatIconModule,MatPaginatorModule,MatTableModule,DeleteModule,MatButtonModule
  ]
})
export class OrdersModule { }
