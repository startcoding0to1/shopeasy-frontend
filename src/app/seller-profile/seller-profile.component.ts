import { Component } from '@angular/core';

@Component({
  selector: 'app-seller-profile',
  templateUrl: './seller-profile.component.html',
  styleUrl: './seller-profile.component.scss'
})
export class SellerProfileComponent {
  userName:string = 'Mahammad Khairuddin Khadergari Shaik';
  categoryCount:Number = 4;
  productsCount:Number = 3;
  isToggled:Boolean=false;
  spaceControl!:string;
  toggleSpace(param:string){
    this.spaceControl = param;
  }
}
