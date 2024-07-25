import { Component } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  userName:string = 'Mahammad Khairuddin Khadergari Shaik';
  cartCount:Number = 4;
  wishListCount:Number = 3;
  odersCount:Number = 2;
  isToggled:Boolean=false;
  spaceControl!:string;
  toggleSpace(param:string){
    this.spaceControl = param;
  }
}
