import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { PlaceOrderComponent } from './place-order/place-order.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {
        path:'',
        redirectTo:'profile',
        pathMatch:'full'
      },
      {
        path:'profile',
        component:UserProfileComponent
      },
      {
        path:'wishlist',
        component:WishlistComponent
      },
      {
        path:'placeOrder',
        component:PlaceOrderComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
