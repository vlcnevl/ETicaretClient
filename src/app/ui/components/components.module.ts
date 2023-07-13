import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsModule } from './products/products.module';
import { HomeModule } from './home/home.module';
import { BasketsModule } from './baskets/baskets.module';
import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { ResetPasswordModule } from './reset-password/reset-password.module';
import { UpdatePasswordModule } from './update-password/update-password.module';



@NgModule({
  declarations: [  ],
  imports: [
    CommonModule,ProductsModule,HomeModule,BasketsModule,RegisterModule,ResetPasswordModule,UpdatePasswordModule//,LoginModule
  ],
  exports:[BasketsModule] // app module de kullanılması için export ettik . baskets module de de componenti export ettik.
})
export class ComponentsModule { }
