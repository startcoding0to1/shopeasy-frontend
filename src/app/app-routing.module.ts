import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerDashboardComponent } from './seller-dashboard/seller-dashboard.component';

const routes: Routes = [
  {
    path:'',
    loadChildren:()=>import('./header/header.module').then(m=>m.HeaderModule)
  },
  {
    path:'auth',
    loadChildren:()=>import('./login/login.module').then(m=>m.LoginModule)
  },
  {
    path:'seller-dashboard',
    component:SellerDashboardComponent
  },
  {
    path:'customer',
    loadChildren:()=>import('./user-profile/user.module').then(m=>m.UserModule)
  },
  {
    path:'seller',
    loadChildren:()=>import('./seller-profile/seller.module').then(m=>m.SellerModule)
  },
  {
    path:'**',
    redirectTo:''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
