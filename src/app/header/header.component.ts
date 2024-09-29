import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../_services/LocalStorageService';
import { Roles } from '../models/Roles';
import { UserDTO } from '../models/UserDTO';
import { CustomerDTO } from '../models/CustomerDTO';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  customerDTO!:CustomerDTO;
  currentTime: string = new Date().toISOString();
  cartItems:number = 0;
  wishlistItems:number=0;
  userName!:string;
  profileImg!:string;
  constructor(
    private localStorageService:LocalStorageService,
  ){}
  loginStatus:boolean = false;
  userRole:Roles = Roles.SELLER;
  ngOnInit() {
    this.loginStatus = this.localStorageService.getLoginStatus;
    const userDetails:UserDTO = this.loginStatus ? this.localStorageService.getUserDetails:null;
    this.userName = userDetails ? userDetails.getUserFirstName+"" : "UserName";
    let profileUrl =null;
    if (userDetails && userDetails.getProfilePic) {
      profileUrl = `data:image/jpeg;base64,${userDetails.getProfilePic}`;
    }
    this.profileImg = profileUrl?profileUrl:"https://static.vecteezy.com/system/resources/thumbnails/007/407/996/small/user-icon-person-icon-client-symbol-login-head-sign-icon-design-vector.jpg";
    this.localStorageService.custData$.subscribe({
      next:(response:any)=>{
        this.customerDTO = response;
        this.wishlistItems = (this.customerDTO)?this.customerDTO.getWishlistDTOS.length:[].length;
        this.cartItems = (this.customerDTO)?this.customerDTO.getCartDTOS.length:[].length;
      }
    })
  }
  logOut() {
    this.localStorageService.clearUserdata();
    this.loginStatus = this.localStorageService.getLoginStatus;
    this.cartItems=0;
    this.wishlistItems=0
  }
}
