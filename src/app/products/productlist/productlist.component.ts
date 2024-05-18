import { Component } from '@angular/core';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrl: './productlist.component.scss'
})
export class ProductlistComponent {

  products: any[] = [
    { id: 1, name: "Product 1",img:"https://m.media-amazon.com/images/I/71MaGTXl7ML._SY741_.jpg", price: 10.99,quantity:0 ,wishList:false},
    { id: 2, name: "Product 2",img:"https://m.media-amazon.com/images/I/71MaGTXl7ML._SY741_.jpg", price: 10.99,quantity:1 ,wishList:false},
    { id: 3, name: "Product 3",img:"https://m.media-amazon.com/images/I/71MaGTXl7ML._SY741_.jpg", price: 10.99,quantity:7 ,wishList:false},
    { id: 4, name: "Product 4",img:"https://m.media-amazon.com/images/I/71MaGTXl7ML._SY741_.jpg", price: 10.99,quantity:10 ,wishList:false},
    { id: 5, name: "Product 5",img:"https://m.media-amazon.com/images/I/71MaGTXl7ML._SY741_.jpg", price: 10.99,quantity:5 ,wishList:false},
    { id: 6, name: "Product 6",img:"https://m.media-amazon.com/images/I/71MaGTXl7ML._SY741_.jpg", price: 10.99,quantity:3 ,wishList:false},
    { id: 7, name: "Product 7",img:"https://m.media-amazon.com/images/I/71MaGTXl7ML._SY741_.jpg", price: 10.99,quantity:2 ,wishList:false},
    { id: 8, name: "Product 8",img:"https://m.media-amazon.com/images/I/71MaGTXl7ML._SY741_.jpg", price: 10.99,quantity:23 ,wishList:false},
    { id: 9, name: "Product 9",img:"https://m.media-amazon.com/images/I/71MaGTXl7ML._SY741_.jpg", price: 10.99,quantity:0 ,wishList:false},
    { id: 10, name: "Product 10",img:"https://m.media-amazon.com/images/I/71MaGTXl7ML._SY741_.jpg", price: 10.99,quantity:7 ,wishList:false},
    { id: 11, name: "Product 11",img:"https://m.media-amazon.com/images/I/71MaGTXl7ML._SY741_.jpg", price: 10.99,quantity:3 ,wishList:false},
    { id: 12, name: "Product 12",img:"https://m.media-amazon.com/images/I/71MaGTXl7ML._SY741_.jpg", price: 10.99,quantity:5 ,wishList:false},
    { id: 13, name: "Product 13",img:"https://m.media-amazon.com/images/I/71MaGTXl7ML._SY741_.jpg", price: 10.99,quantity:7 ,wishList:false},
    { id: 14, name: "Product 14",img:"https://m.media-amazon.com/images/I/71MaGTXl7ML._SY741_.jpg", price: 10.99,quantity:3 ,wishList:false},
    { id: 15, name: "Product 15",img:"https://m.media-amazon.com/images/I/71MaGTXl7ML._SY741_.jpg", price: 10.99,quantity:2 ,wishList:false},
    { id: 16, name: "Product 16",img:"https://m.media-amazon.com/images/I/71MaGTXl7ML._SY741_.jpg", price: 10.99,quantity:0 ,wishList:false},
    { id: 17, name: "Product 17",img:"https://m.media-amazon.com/images/I/71MaGTXl7ML._SY741_.jpg", price: 10.99,quantity:3 ,wishList:false},
    { id: 18, name: "Product 18",img:"https://m.media-amazon.com/images/I/71MaGTXl7ML._SY741_.jpg", price: 10.99,quantity:7 ,wishList:false},
    { id: 19, name: "Product 19",img:"https://m.media-amazon.com/images/I/71MaGTXl7ML._SY741_.jpg", price: 10.99,quantity:0 ,wishList:false},
    { id: 20, name: "Product 20",img:"https://m.media-amazon.com/images/I/71MaGTXl7ML._SY741_.jpg", price: 10.99,quantity:32 ,wishList:false}
  ];

  addtoWishlist(i:any){
    this.products[i].wishList=!this.products[i].wishList;
  }

}
