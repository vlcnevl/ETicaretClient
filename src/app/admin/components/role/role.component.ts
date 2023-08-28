import { Component, ViewChild } from '@angular/core';
import { ListComponent } from '../role/list/list.component';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent {
  @ViewChild(ListComponent) listComponent:ListComponent;

  createdProduct(createdRole:string){ // rol ekleyince list componentdeki get rolesi  tetikledi
    this.listComponent.getRoles(); // redux yada service kullanılabilridi
  }


}
