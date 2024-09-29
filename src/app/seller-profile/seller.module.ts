import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerRoutingModule } from './seller-routing.module';
import { SellerDetailsComponent } from './seller-details/seller-details.component';
import { SellerProfileComponent } from './seller-profile.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SellerProfileComponent,
    SellerDetailsComponent    
  ],
  imports: [
    CommonModule,
    SellerRoutingModule,
    ReactiveFormsModule
  ]
})
export class SellerModule { }
