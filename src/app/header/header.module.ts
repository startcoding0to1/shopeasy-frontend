import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderRoutingModule } from './header-routing.module';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HeaderRoutingModule
  ]
})
export class HeaderModule { }
