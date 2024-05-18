import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { ProductlistComponent } from './productlist/productlist.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { ProductCartComponent } from './product-cart/product-cart.component';

const routes: Routes = [
  {
    path:'',
    component:ProductsComponent,
    children:[
      {
        path:'',
        component:ProductlistComponent
      },
      {
        path:'products',
        component:ProductlistComponent
      },
      {
        path:'prodDetails',
        component:ProductdetailsComponent
      },
      {
        path:'cart',
        component:ProductCartComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
