import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductlistComponent } from './productlist/productlist.component';
import { ProductsComponent } from './products.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';

const routes: Routes = [{
  path:'',
  component:ProductsComponent,
  children:[
    {
      path:'',
      component:ProductlistComponent,
    },
    {
      path:'product-details',
      component:ProductdetailsComponent
    }
]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
