import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WishlistComponent } from './wishlist/wishlist.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { SellerDashboardComponent } from './seller-dashboard/seller-dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  {
    path:'',
    component:HeaderComponent
  },
  {
    path:'auth',
    loadChildren:()=>import('./login/login.module').then(m=>m.LoginModule)
  },
  {
    path:'products',
    loadChildren:()=>import('./products/products.module').then(m=>m.ProductsModule)
  },
  {
    path:'dashboard',
    component:SellerDashboardComponent
  },
  {
    path:'header',
    component:HeaderComponent
  },
  {
    path:'wishlist',
    component:WishlistComponent
  },
  {
    path:'profile',
    component:UserProfileComponent
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
