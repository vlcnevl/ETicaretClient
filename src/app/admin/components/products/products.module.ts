import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon'
// import { MatDialogModule } from '@angular/material/dialog';
// import { DeleteDialogComponent } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { DialogModule } from 'src/app/dialogs/dialog.module';
import { DeleteModule } from 'src/app/directives/admin/delete.module';


@NgModule({
  declarations: [
    ProductsComponent,
    CreateComponent,
    ListComponent,
  ],
  imports: [
    CommonModule,RouterModule.forChild([{path:"",component:ProductsComponent}]),
    MatSidenavModule,MatInputModule,MatButtonModule,MatTableModule,MatPaginatorModule,MatIconModule,DialogModule,DeleteModule
  ]
})
export class ProductsModule { }
