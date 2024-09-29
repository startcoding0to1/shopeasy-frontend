import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path:'',
    component:HeaderComponent,
    children:[
      {
        path:'',
        redirectTo:'home',
        pathMatch:'full'
      },
      {
        path:'home',
        component:HomeComponent
      },
      {
        path:'products',
        loadChildren:()=>import('../products/products.module').then(m=>m.ProductsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeaderRoutingModule { }
