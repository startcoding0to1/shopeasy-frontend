import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductlistComponent } from './productlist/productlist.component';
import { AddedToWishlist } from './productlist/addedToWishlist';
import { ProductsComponent } from './products.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';


@NgModule({
  declarations: [
    ProductsComponent,
    AddedToWishlist,
    ProductlistComponent,
    ProductdetailsComponent    
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
