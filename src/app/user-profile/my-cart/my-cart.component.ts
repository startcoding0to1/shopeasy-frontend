import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Product } from '../../models/Product';
import { LocalStorageService } from '../../_services/LocalStorageService';
import { ProductsService } from '../../_services/ProductsService';
import { CustomerDTO } from '../../models/CustomerDTO';
import { CartService } from '../../_services/Cartservice';
import { CartDTO } from '../../models/CartDTO';
import { CustomerOrderDTO } from '../../models/CustomerOrderDTO';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrl: './my-cart.component.scss'
})
export class MyCartComponent  implements OnInit{

  @Output() orderTobePlaced = new EventEmitter<CustomerOrderDTO | null>();

 products!:Product[];
 customer!:CustomerDTO;
 cartDtos!:CartDTO[];
 toggler:boolean = true;
  amountPerDay:number=100;
 deliveryCharges:number=0;
 deliveryDays:number=0;
 totalPrice!:number;
 finalPrice!:number;
 offerFlag:boolean=false;
 offerPrice:number=50;
 CartWithProductdetails!:any[];

  constructor(
    private localStorage:LocalStorageService,
    private productsService:ProductsService,
    private cartService:CartService,
  ){}

  ngOnInit(): void {
    console.log("Enter in to cart")
    this.localStorage.custData$.subscribe({
      next:(response:CustomerDTO)=>{
          console.log("In if")
          this.customer = response;
          if(this.customer && this.customer.getCartDTOS.length>0){
            this.cartDtos = this.customer.getCartDTOS;
            this.products = [];
            this.CartWithProductdetails = [];
            this.finalPrice = 0
            this.customer.getCartDTOS.forEach(item => {
              if(!this.products.find(product => product.productId === item.productId)){
                this.productsService.getProductById(item.productId).subscribe({
                  next:(response:Product)=>{
                    console.log("response:  "+JSON.stringify(response));
                    this.products.push(response);
                    this.CartWithProductdetails.push({...item,product:response})
                    const fP:number = (item.quantity*response.prodPrice);
                    this.finalPrice=Number((this.finalPrice+fP).toFixed(2));
                    this.totalPrice = this.finalPrice;
                  },
                  error:(err:any)=>{
                    console.log(JSON.stringify(err));
                  }
                });
              }
            });;
          }else{
            this.cartDtos = [];
          }
      },
      error:()=>{
        this.cartDtos = [];
      }
    })
    this.deliveryDays=0;
  }

    updateCartItem(productId:string,upQuantity:number){
      const cartItem = this.cartDtos.find(item => item.productId === productId);
      if(cartItem !== undefined){

        const num:number = cartItem.quantity+upQuantity;
        cartItem.quantity= num;
        this.cartService.updateCartItem(cartItem).subscribe({
          next:(response:any)=>{
            console.log(JSON.stringify(response))
            this.customer.setCartDTOS = this.customer.getCartDTOS.map(item =>{
              if(item.cartId == cartItem.cartId){
                item.quantity = num;
              }
              return item;
            });
            this.localStorage.setCustomer=this.customer;
            this.cartDtos=this.customer.getCartDTOS;
          },
          error:(err:any)=>{
            console.log(JSON.stringify(err))
          }
        });
      }
  }

  removeCartItem(productId:string){
    const cartItem = this.cartDtos.find(item => item.productId === productId);
    if(cartItem !== undefined){
      this.cartService.deleteCartItem(cartItem.cartId).subscribe({
        next:(response:any)=>{
          console.log(JSON.stringify(response))
          this.cartDtos = this.cartDtos.filter(item => item.cartId !== cartItem.cartId);
          this.customer.setCartDTOS = this.cartDtos;
          this.localStorage.setCustomer = this.customer;
          this.products = this.products.filter(product => product.productId !== productId);
        },
        error:(err:any)=>{
          console.log(JSON.stringify(err));
        }
      });
    }
  }

  checkCartItemQuantity(productId:string){
    const cartItem = this.cartDtos.find(item => item.productId === productId);
    return cartItem?cartItem.quantity:0;
  }

  // Place order stuff
  calCulateTotalPrice(pricePerProduct:number, quantity:number){
    return (pricePerProduct*quantity).toFixed(2);
  }

  updateFinalPrice(event:Event){
    const noofDays:number = Number((event.target as HTMLInputElement).value);
    if(this.deliveryDays !== 0){
      this.finalPrice = this.finalPrice - (this.amountPerDay/this.deliveryDays)
    }
    this.deliveryDays =noofDays;
    if(noofDays !== 0){
      this.deliveryCharges = Number((this.amountPerDay/noofDays).toFixed(2));
    }else{
      this.deliveryCharges = Number((this.amountPerDay*noofDays).toFixed(2));
    }
    this.finalPrice = Number((this.finalPrice+this.deliveryCharges).toFixed(2));
  }

  includeOffer(event:Event){
    const flag = (event.target as HTMLInputElement).checked;
    if(this.finalPrice>this.offerPrice){
      if(this.finalPrice>1000 && this.finalPrice<3000){
        this.offerPrice =200
      }else if(this.finalPrice>3000 && this.finalPrice<4000){
        this.offerPrice =300
      }else if(this.finalPrice>4000 && this.finalPrice<5000){
        this.offerPrice =400
      }else if(this.finalPrice>5000){
        this.offerPrice =500
      }
      if(flag){
        this.finalPrice = this.finalPrice - this.offerPrice;
      }else{
        this.finalPrice = this.finalPrice + this.offerPrice;
      } 
    }
    this.offerFlag=flag;
  }

  OrderTobePlaced(){
    let productIds = '';
    for(let i=0;i<this.cartDtos.length;i++){
      if(i==this.cartDtos.length-1){
        productIds += this.cartDtos[i].productId;
        break;
      }
      productIds += this.cartDtos[i].productId+',';
    }
    let customerOrderDTO:CustomerOrderDTO|null = null;
    if(this.customer && this.customer.getCartDTOS.length>0){
      customerOrderDTO= {orderId:0,customerId:this.customer.getCustomerId,productId:productIds,totalPrice:this.finalPrice,orderStatus:'',deliverStatus:'',deliverDate:'',paymentStatus:'',address:'',orderPlacedTime:'',lastUpdate:'',feedBack:''};
    }
    this.orderTobePlaced.emit(customerOrderDTO);
  }
}


