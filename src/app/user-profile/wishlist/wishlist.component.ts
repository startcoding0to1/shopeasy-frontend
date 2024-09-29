import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../_services/LocalStorageService';
import { Product } from '../../models/Product';
import { CustomerDTO } from '../../models/CustomerDTO';
import { ProductsService } from '../../_services/ProductsService';
import { WishlistDTO } from '../../models/WishlistDTO';
import { WishListService } from '../../_services/WishListService';
import { CartDTO } from '../../models/CartDTO';
import { CartService } from '../../_services/Cartservice';
import { response } from 'express';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit{
  products:Product[]=[];
  customer!:CustomerDTO;
  wishlistDTOs!:WishlistDTO[];
  cartDtos!:CartDTO[];
  toggler:boolean = true;

  constructor(
    private localStorage:LocalStorageService,
    private productsService:ProductsService,
    private wishListService:WishListService,
    private cartService:CartService
  ){}

  ngOnInit(): void {
    this.localStorage.custData$.subscribe({
      next:(response:CustomerDTO)=>{
        if(!this.customer){
          this.customer = response;
          if(this.customer && this.customer.getWishlistDTOS.length>0){
            this.wishlistDTOs = this.customer.getWishlistDTOS;
            this.cartDtos = this.customer.getCartDTOS;
            this.customer.getWishlistDTOS.forEach(item => {
              this.productsService.getProductById(item.productId).subscribe({
                next:(response:Product)=>{
                  console.log("REsponse: wishlist: "+JSON.stringify(response));
                  this.products.push(response);
                },
                error:(err:any)=>{
                  console.log(JSON.stringify(err));
                }
              });
            });
          }else{
            this.wishlistDTOs = [];
            this.cartDtos = [];
          }
        }else{
          this.cartDtos = response.getCartDTOS;
        }
      },
      error:()=>{
        this.wishlistDTOs = [];
        this.cartDtos = [];
      }
    });
    
  }  

  removeWishlistItem(productId:string){
    const wishlistId = this.wishlistDTOs.find(item => item.productId === productId)?.wishlistId;
    if(wishlistId !== undefined){
      this.wishListService.removeWishlistItem(wishlistId).subscribe({
        next:(response:any)=>{
          console.log(JSON.stringify(response));
          this.wishlistDTOs = this.wishlistDTOs.filter(item => item.wishlistId !== wishlistId);
          this.customer.setWishlistDTOS = this.wishlistDTOs;
          this.localStorage.setCustomer = this.customer;
          this.products = this.products.filter(product => product.productId !== productId);
        },
        error:(err:any)=>{
          console.log(JSON.stringify(err));
        }
      });
    }
  }
  // Cart handling
  updateCart(productId:string){
    const cartItem = this.cartDtos.find(item=>item.productId===productId);
    if(cartItem !== undefined){
      this.removeCartItem(cartItem.cartId);
      return this.toggler;
    }else{
      this.addtoCart(productId);
      return this.toggler;
    }
  }

  addtoCart(productId:string){
    if(this.customer !== null){
      const cartIDto:CartDTO = new CartDTO(0,this.customer.getCustomerId,productId,1,"");
      this.cartService.addItemToCart(cartIDto).subscribe({
        next:(response:any)=>{
          console.log(JSON.stringify(response))
          cartIDto.CartId = response.id;
          this.customer.getCartDTOS.push(cartIDto);
          this.localStorage.setCustomer=this.customer;
          this.cartDtos=this.customer.getCartDTOS;
          this.toggler = true;
        },
        error:(err:any)=>{
          this.toggler = false;
          console.log(JSON.stringify(err))
        }
      });
    }
  }

  removeCartItem(cartId:number){
    this.cartService.deleteCartItem(cartId).subscribe({
      next:(response:any)=>{
        console.log(JSON.stringify(response))
        this.cartDtos = this.cartDtos.filter(item => item.cartId !== cartId);
        this.customer.setCartDTOS = this.cartDtos;
        this.localStorage.setCustomer = this.customer;
        this.toggler = false;
      },
      error:(err:any)=>{
        console.log(JSON.stringify(err));
        this.toggler = true;
      }
    });
  }
  checkCartItems(productId:string){    
    return this.cartDtos.some(item => item.productId === productId);
  }
}
