import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserProfileComponent } from './user-profile.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WishlistComponent } from './wishlist/wishlist.component';
import { MyCartComponent } from './my-cart/my-cart.component';
import { PlaceOrderComponent } from './place-order/place-order.component';


@NgModule({
  declarations: [
    UserProfileComponent,
    UserDetailsComponent,
    WishlistComponent,
    MyCartComponent,
    PlaceOrderComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class UserModule { }
