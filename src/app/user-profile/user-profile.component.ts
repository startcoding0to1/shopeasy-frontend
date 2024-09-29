import {Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../_services/UserService';
import { LocalStorageService } from '../_services/LocalStorageService';
import { CustomerDTO } from '../models/CustomerDTO';
import { UserDTO } from '../models/UserDTO';
import { Router } from '@angular/router';
import { CustomerOrderDTO } from '../models/CustomerOrderDTO';
import { PlaceOrderComponent } from './place-order/place-order.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {

  @ViewChild(PlaceOrderComponent) placeOrderComponent!: PlaceOrderComponent;
  constructor(
    private userService:UserService,
    private localStorage:LocalStorageService,
    private route:Router
  ){}
  userId!:string;
  isVisible:boolean=false;
  profilePic!: string | ArrayBuffer | null;
  updateProfilePic!: File | null;
  userName!:string;
  cartCount!:Number;
  wishListCount!:Number;
  odersCount!:Number;
  isToggled:Boolean=false;
  spaceControl!:string;
  toggleSpace(param:string){
    this.spaceControl = param;
  }
  onFileSelected(event: Event):void{
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0 && this.userId !== "0") {
      const file = input.files[0];
      this.updateProfilePic =file;
      const formData = new FormData();
      formData.append('profileImg', this.updateProfilePic);
      formData.append('userId', this.userId);
      this.userService.uploadImg(formData).subscribe({// Logic to upload the photo
        next:(response:any)=>{
          if(response){
            const reader = new FileReader();
            reader.onload = (e: ProgressEvent<FileReader>) => {
              let userDetsils:UserDTO = this.localStorage.getUserDetails;
              userDetsils.setProfilePic = reader.result?.slice(23)+"";
              this.localStorage.setUserDetails = userDetsils;
              this.profilePic = reader.result;
            };
            reader.readAsDataURL(file);            
          }
        },
        error:(error:any)=>{
          console.error('Upload failed:', error);        }  
      });
    }
  }
  showPopover() {
    this.isVisible = !this.isVisible;
  }

  hidePopover() {
    this.isVisible = false;
  }
  removePhoto() {
    this.userService.deleteImg(this.userId).subscribe({// Logic to upload the photo
      next:(response:any)=>{
        let userDetsils:UserDTO = this.localStorage.getUserDetails;
        userDetsils.setProfilePic = "";
        this.localStorage.setUserDetails = userDetsils;
        this.profilePic = "https://static.vecteezy.com/system/resources/thumbnails/007/407/996/small/user-icon-person-icon-client-symbol-login-head-sign-icon-design-vector.jpg";
      },
        error:(error:any)=>{
          console.error('Upload failed:', error);        }  
      });
  }
  ngOnInit(): void {
    const user:UserDTO = this.localStorage.getUserDetails;
    this.userName  = (user  && user.getUserFirstName && user.getUserLastName) ? 
    user.getUserFirstName+" "+user.getUserLastName : "Mahammad Khairuddin Khadergari Shaik";
    this.localStorage.custData$.subscribe({
      next:(response:CustomerDTO)=>{
        const custmer:CustomerDTO = response;
        this.cartCount = (custmer)?custmer.getCartDTOS.length:0;
        this.wishListCount = (custmer)?custmer.getWishlistDTOS.length:0;
      }
    })
    const profileUrl = (user && user.getProfilePic !=="")?`data:image/jpeg;base64,${user.getProfilePic}`:"https://static.vecteezy.com/system/resources/thumbnails/007/407/996/small/user-icon-person-icon-client-symbol-login-head-sign-icon-design-vector.jpg";
    this.profilePic = profileUrl;
    this.userId =  (user  && user.getUserId) ? user.getUserId:"0";
  }
  proceedToPlaceOrder(event:CustomerOrderDTO | null){
    if(event){
      this.route.navigate(['/customer/placeOrder'], { state: { customerOrderDTO: event } });
    }
  }
}
