import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Roles } from '../../models/Roles';
import { UserDTO } from '../../models/UserDTO';
import { LocalStorageService } from '../../_services/LocalStorageService';
import { UserService } from '../../_services/UserService';
import { forkJoin } from 'rxjs';
import { WishListService } from '../../_services/WishListService';
import { CartService } from '../../_services/Cartservice';
import { CustomerDTO } from '../../models/CustomerDTO';
import { CartDTO } from '../../models/CartDTO';
import { WishlistDTO } from '../../models/WishlistDTO';

@Component({
  selector: 'app-login-result',
  templateUrl: './login-result.component.html',
  styleUrl: './login-result.component.scss'
})
export class LoginResultComponent implements OnInit{
  loginStatus:boolean = false;
  roles:Roles[]=[Roles.CUSTOMER,Roles.SELLER];
  customerDTO!:CustomerDTO;
  constructor(
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private localStorageService:LocalStorageService,
    private userService:UserService,
    private wishListService:WishListService,
    private cartService:CartService  
  ){}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(param=>{
      const liginStatus = param.get('id');
      if(liginStatus === 'success'){
        this.loginStatus = true;
      }
    });
  }

  navigateTo(role:any){
    if(role === Roles.CUSTOMER){
      const userDetails:UserDTO = this.loginStatus ? this.localStorageService.getUserDetails:null;
      const userId:string | null = userDetails !== null ? userDetails.getUserId:null;
          if(userId){
      this.userService.getUsersDetails(userId,'customer').subscribe({//Fetch Customer Id
        next:(response1:any)=>{
          if (response1) {          
            const wishlistObservable = this.wishListService.getAllWishlistItems(response1.id);
            const cartObservable = this.cartService.getAllCartItems(response1.id);
            forkJoin([wishlistObservable, cartObservable]).subscribe({
              next: ([response2, response3]: [any, any]) => {
                let wishItems: WishlistDTO[] = [];
                if (response2 !== null) {
                  response2.forEach((element: any) => {
                    wishItems.push(new WishlistDTO(element.wishlistId, element.productId, element.customerDetailsId, element.creationTime, element.liked));
                  });
                }
                let cartItems: CartDTO[] = [];          
                if (response3 !== null) {
                  response3.forEach((element: any) => {
                    cartItems.push(new CartDTO(element.cartId, element.customerDetailsId, element.productId, element.quantity, element.creationTime));
                  });
                }
                this.customerDTO = new CustomerDTO(response1.id, userId, "", wishItems, cartItems, []);
                // this.wishlistItems = this.customerDTO.getWishlistDTOS.length;
                // this.cartItems = this.customerDTO.getCartDTOS.length;
                this.localStorageService.setCustomer = this.customerDTO;
              },
              error: (err:any) => {
                console.error('Error fetching wishlist or cart items:', err);
              }
            });
          }          
        },
        error:(err:any)=>{
          console.log("Error:   ",err);
        }
      });      
    }
      this.router.navigate(['/header']);
    }
    else if(role === Roles.SELLER){
      this.router.navigate(['/seller-dashboard']);
    }
    else if(role === Roles.ADMIN){

    }
  }
}
