import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../models/Product';
import { CustomerDTO } from '../../models/CustomerDTO';
import { CartDTO } from '../../models/CartDTO';
import { CartService } from '../../_services/Cartservice';
import { LocalStorageService } from '../../_services/LocalStorageService';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.scss'
})
export class ProductdetailsComponent implements OnInit{
  product!: Product;
  rating:number[]=[];
  percentage:string='0';
  customer!:CustomerDTO;
  cartDtos!:CartDTO[];
  toggler:boolean = false;

  constructor(
    private router:Router,
    private cartService:CartService,
    private localStorage:LocalStorageService
  ){}

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    if(navigation?.extras.state){
      this.product = navigation.extras.state['product']; //or navigation.extras.state.product;
    }else if (history.state && history.state.product) {
      this.product = history.state.product; // Fallback to history.state
    }else{
      this.product = { productId: '', productName: '', prodCategory: '', prodSubCategory: '', prodPrice: 0, discountPrice: 0, quantity: 0, prodAvailability: '', productDesc: '', imageUrl: '', videoUrl: '', brand: '', productSize: '', rating: 0, sellerId: 0, totalReviews: 0, creationTime: '', lastUpdateTime: '' };
    }
    this.counter(this.product.rating);
    this.calCulatePercentage(this.product.prodPrice,this.product.discountPrice);
    this.customer = this.localStorage.getCustomer;
    this.cartDtos = this.customer.getCartDTOS;
    this.checkCartItems(this.product.productId);
  }

  counter(rating:number){
    for(let i=1; i<=rating;i++){
      this.rating.push(i);
    }
  }

  calCulatePercentage(oPrice:number,dPrice:number){
    this.percentage =  (((oPrice-dPrice)/oPrice)*100).toFixed(2);
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
        this.cartDtos = this.cartDtos.filter(item => item.cartId !== cartId);
        this.customer.setCartDTOS = this.cartDtos;
        this.localStorage.setCustomer = this.customer;
        console.log(JSON.stringify(response))
        this.toggler = false;
      },
      error:(err:any)=>{
        console.log(JSON.stringify(err));
        this.toggler = true;
      }
    });
  }
  checkCartItems(productId:string){    
    this.toggler = this.cartDtos.some(item => item.productId === productId);
  }
}
