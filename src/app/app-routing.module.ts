import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './admin/layout/layout.component';
import { HomeComponent } from './ui/components/home/home.component';
import { AuthGuard } from './guards/common/auth.guard';

const routes: Routes = [
  {
    path: 'admin',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,canActivate:[AuthGuard],
      },
      {
        path: 'customers',
        loadChildren: () =>
          // lazyloading
          import('./admin/components/customers/customers.module').then(
            (module) => module.CustomersModule
          ), // admin/customers/... dan sonra gelecek şeyleri customers module içinde araması gerektiğini söyledik
          canActivate:[AuthGuard],
        },
      {
        path: 'products',
        loadChildren: () =>
          import('./admin/components/products/products.module').then(
            (module) => module.ProductsModule
          ),canActivate:[AuthGuard],
      },
      {
        path: 'orders',
        loadChildren: () =>
          import('./admin/components/orders/orders.module').then(
            (module) => module.OrdersModule
          ),canActivate:[AuthGuard],
      },
      {
        path: 'authorize-menu',
        loadChildren: () =>
          import('./admin/components/authorize-menu/authorize-menu.module').then(
            (module) => module.AuthorizeMenuModule
          ),canActivate:[AuthGuard],
      },
      {
        path: 'role-menu',
        loadChildren: () =>
          import('./admin/components/role/role.module').then(
            (module) => module.RoleModule
          ),canActivate:[AuthGuard],
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./admin/components/user/user.module').then(
            (module) => module.UserModule
          ),canActivate:[AuthGuard],
      },


    ],canActivate:[AuthGuard],
  },

  { path: '', component: HomeComponent },
  {
    path: 'products',
    loadChildren: () =>
      import('./ui/components/products/products.module').then(
        (module) => module.ProductsModule
      ),
  },
  {
    path: 'products/:pageNo',
    loadChildren: () =>
      import('./ui/components/products/products.module').then(
        (module) => module.ProductsModule
      ),
  },

  {
    path: 'baskets',
    loadChildren: () =>
      import('./ui/components/baskets/baskets.module').then(
        (module) => module.BasketsModule
      ),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./ui/components/register/register.module').then(
        (module) => module.RegisterModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./ui/components/login/login.module').then(
        (module) => module.LoginModule
      ),
  },
  {
    path:'reset-password',
    loadChildren:()=> import('./ui/components/reset-password/reset-password.module').then((module)=> module.ResetPasswordModule)

  },
  {
    path:'update-password/:userId/:resetToken',
    loadChildren:()=> import('./ui/components/update-password/update-password.module').then((module)=> module.UpdatePasswordModule)

  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
