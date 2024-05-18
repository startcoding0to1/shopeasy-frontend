import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ProductlistComponent } from './productlist/productlist.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { ProductCartComponent } from './product-cart/product-cart.component';
import { AddedToWishlist } from './productlist/addedToWishlist';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductlistComponent,
    ProductdetailsComponent,
    ProductCartComponent,
    AddedToWishlist
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
