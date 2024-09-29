import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../_services/ProductsService';
import { Product } from '../../models/Product';
import { WishListService } from '../../_services/WishListService';
import { WishlistDTO } from '../../models/WishlistDTO';
import { CustomerDTO } from '../../models/CustomerDTO';
import { LocalStorageService } from '../../_services/LocalStorageService';
import { CartDTO } from '../../models/CartDTO';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrl: './productlist.component.scss'
})
export class ProductlistComponent implements OnInit{

  currentPage:number = 1; // Track the current page
  itemsPerPage:number =12; // Display 12 products per page
  customer!:CustomerDTO;
  wishlistDTOs!:WishlistDTO[];
  cartDTO!:CartDTO[];
  products: any[] = [];
  toggler:boolean = false;
  rating:number[]=[];
  //  = [
  //   { id: 1, name: "Product 1",img:"https://m.media-amazon.com/images/I/71MaGTXl7ML._SY741_.jpg", price: 10.99,quantity:0 ,wishList:false},
  //   { id: 2, name: "Product 2",img:"https://m.media-amazon.com/images/I/71MaGTXl7ML._SY741_.jpg", price: 10.99,quantity:1 ,wishList:false},
  //   { id: 3, name: "Product 3",img:"https://m.media-amazon.com/images/I/71MaGTXl7ML._SY741_.jpg", price: 10.99,quantity:7 ,wishList:false},
  //   { id: 4, name: "Product 4",img:"https://m.media-amazon.com/images/I/71MaGTXl7ML._SY741_.jpg", price: 10.99,quantity:10 ,wishList:false},
  //   { id: 5, name: "Product 5",img:"https://m.media-amazon.com/images/I/71MaGTXl7ML._SY741_.jpg", price: 10.99,quantity:5 ,wishList:false},
  //   { id: 6, name: "Product 6",img:"https://m.media-amazon.com/images/I/71MaGTXl7ML._SY741_.jpg", price: 10.99,quantity:3 ,wishList:false},
  //   { id: 7, name: "Product 7",img:"https://m.media-amazon.com/images/I/71MaGTXl7ML._SY741_.jpg", price: 10.99,quantity:2 ,wishList:false},
  //   { id: 8, name: "Product 8",img:"https://m.media-amazon.com/images/I/71MaGTXl7ML._SY741_.jpg", price: 10.99,quantity:23 ,wishList:false},
  //   { id: 9, name: "Product 9",img:"https://m.media-amazon.com/images/I/71MaGTXl7ML._SY741_.jpg", price: 10.99,quantity:0 ,wishList:false},
  //   { id: 10, name: "Product 10",img:"https://m.media-amazon.com/images/I/71MaGTXl7ML._SY741_.jpg", price: 10.99,quantity:7 ,wishList:false},
  //   { id: 11, name: "Product 11",img:"https://m.media-amazon.com/images/I/71MaGTXl7ML._SY741_.jpg", price: 10.99,quantity:3 ,wishList:false},
  //   { id: 12, name: "Product 12",img:"https://m.media-amazon.com/images/I/71MaGTXl7ML._SY741_.jpg", price: 10.99,quantity:5 ,wishList:false},
  //   { id: 13, name: "Product 13",img:"https://m.media-amazon.com/images/I/71MaGTXl7ML._SY741_.jpg", price: 10.99,quantity:7 ,wishList:false},
  //   { id: 14, name: "Product 14",img:"https://m.media-amazon.com/images/I/71MaGTXl7ML._SY741_.jpg", price: 10.99,quantity:3 ,wishList:false},
  //   { id: 15, name: "Product 15",img:"https://m.media-amazon.com/images/I/71MaGTXl7ML._SY741_.jpg", price: 10.99,quantity:2 ,wishList:false},
  //   { id: 16, name: "Product 16",img:"https://m.media-amazon.com/images/I/71MaGTXl7ML._SY741_.jpg", price: 10.99,quantity:0 ,wishList:false},
  //   { id: 17, name: "Product 17",img:"https://m.media-amazon.com/images/I/71MaGTXl7ML._SY741_.jpg", price: 10.99,quantity:3 ,wishList:false},
  //   { id: 18, name: "Product 18",img:"https://m.media-amazon.com/images/I/71MaGTXl7ML._SY741_.jpg", price: 10.99,quantity:7 ,wishList:false},
  //   { id: 19, name: "Product 19",img:"https://m.media-amazon.com/images/I/71MaGTXl7ML._SY741_.jpg", price: 10.99,quantity:0 ,wishList:false},
  //   { id: 20, name: "Product 20",img:"https://m.media-amazon.com/images/I/71MaGTXl7ML._SY741_.jpg", price: 10.99,quantity:32 ,wishList:false}
  // ];

  constructor(
    private productsService:ProductsService,
    private wishListService:WishListService,
    private localStorage:LocalStorageService,
    private router:Router
  ){}
  ngOnInit(): void {
    this.getAllProducts("Men");
    this.customer = this.localStorage.getCustomer;
    this.wishlistDTOs = this.customer.getWishlistDTOS.length>0?this.customer.getWishlistDTOS:[];
  }

  getAllProducts(category:string){
    this.productsService.getAllProducts(category).subscribe({
      next:(response:Product[])=>{
        this.products = response;
      },
      error:(err:any)=>{
        console.log(err);
      }
    });
  }

  // Get the products for the current page
  get paginatedProducts() {
    const startIndex:number = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex:number = startIndex + this.itemsPerPage;
    if(this.products.length<12){
      return this.products;
    }else{
      return this.products.slice(startIndex, endIndex);
    }
  }

  // Navigate to the next page
  nextPage() {
    if (this.currentPage * this.itemsPerPage < this.products.length) {
      this.currentPage++;
    }
  }

  // Navigate to the previous page
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

// Wishlist handling  
  updateWishlist(productId:string){
    const wishlistItem = this.wishlistDTOs.find(item=>item.productId===productId);
    if(wishlistItem !== undefined){
      this.removeWishlistItem(wishlistItem.wishlistId);
      return this.toggler;
    }else{
      this.addtoWishlist(productId);
      return this.toggler;
    }
  }

  addtoWishlist(productId:string){
    if(this.customer !== null){
      const wishListDTO:WishlistDTO = new WishlistDTO(0,productId,this.customer.getCustomerId,true,"");
      this.wishListService.addWishlistItem(wishListDTO).subscribe({
        next:(response:any)=>{
          wishListDTO.wishlistId = response.id;
          this.customer.getWishlistDTOS.push(wishListDTO);
          this.localStorage.setCustomer=this.customer;
          this.wishlistDTOs=this.customer.getWishlistDTOS;
          this.toggler = true;
        },
        error:(err:any)=>{
          this.toggler = false;
        }
      });
    }
  }

  removeWishlistItem(wishlistId:number){
    this.wishListService.removeWishlistItem(wishlistId).subscribe({
      next:(response:any)=>{
        this.wishlistDTOs = this.wishlistDTOs.filter(item => item.wishlistId !== wishlistId);
        this.customer.setWishlistDTOS = this.wishlistDTOs;
        this.localStorage.setCustomer = this.customer;

        this.toggler = false;
      },
      error:(err:any)=>{
        this.toggler = true;
      }
    });
  }

  checkWishlist(productId:string):boolean{
    return this.wishlistDTOs.some(item => item.productId === productId);
  }

  counter(rating:number):number[]{
    for(let i=1; i<=rating;i++){
      this.rating.push(i);
    }
    const prodRating = this.rating;
    this.rating=[];
    return prodRating;
  }

  calCulatePercentage(oPrice:number,dPrice:number){
    return (((oPrice-dPrice)/oPrice)*100).toFixed(2);
  }


  navigateTodisplayProductdetails(product:Product){
    const navigationExtras: NavigationExtras = {
      state: { product } // This sends the product object in the state
    };
    this.router.navigate(['/products/product-details'],navigationExtras); // Here {product} means {product:product}
  }
  
}
