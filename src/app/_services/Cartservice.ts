import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { CartDTO } from "../models/CartDTO";

@Injectable({
    providedIn:'root'
})
export class CartService{
    private baseUrl = 'http://localhost:9090/startcoding0to1/shopEasy';
    private headers:HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' }); 

    constructor(
        private httpClinet:HttpClient
    ){};

    public getAllCartItems(custId:number):Observable<any>{
        const url = `${this.baseUrl}/cartItems/${custId}`;
        return this.httpClinet.get<any>(url,{responseType:'json'})
        .pipe(
            catchError(error=>{
                console.error(`Error occurred while fetching CartItems for custId: ${custId}`, error);
                return throwError(() => new Error(`Failed to fetch Cart Items for custId: ${custId}`));
            })
        );
    }

    public addItemToCart(cartDTO:CartDTO):Observable<any>{
        const url = `${this.baseUrl}/cartItem`;
        return this.httpClinet.post<any>(url,cartDTO,{headers:this.headers}).pipe(
            catchError(error=>{
                console.error(`Error occurred while adding Cart Items for custId: :${cartDTO.CustomerDetailsId}`, error);
                return throwError(()=>new Error(`Failed to add Cart Item for custId: ${cartDTO.CustomerDetailsId}`))
            })
        )
    }

    public updateCartItem(cartDTO:CartDTO):Observable<any>{
        const url = `${this.baseUrl}/cartItem/${cartDTO.CartId}`;
        return this.httpClinet.put<any>(url,cartDTO,{headers:this.headers,responseType:'json'}).pipe(
            catchError(error=>{
                console.error(`Error occurred while updating Cart Item for cartId: ${cartDTO.CartId}`, error);
                return throwError(()=>new Error(`Failed to update Cart Item for cartId: :${cartDTO.CartId}`))
            })
        )
    }

    public deleteCartItem(cartId:number):Observable<any>{
        const url = `${this.baseUrl}/cartItem/${cartId}`;
        return this.httpClinet.delete<any>(url,{responseType:'json'}).pipe(
            catchError(error=>{
                console.error(`Error occurred while deleting Cart Item for cartId:${cartId}`, error);
                return throwError(()=>new Error(`Failed to delete Cart Item for custId: :${cartId}`))
            })
        )
    }
}