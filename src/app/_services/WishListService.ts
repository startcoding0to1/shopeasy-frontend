import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { error } from "console";
import { catchError, Observable, throwError } from "rxjs";
import { WishlistDTO } from "../models/WishlistDTO";

@Injectable({
    providedIn:'root'
})
export class WishListService{
    private baseUrl = 'http://localhost:9090/startcoding0to1/shopEasy';
    private headers:HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' }); 

    constructor(
        private httpClinet:HttpClient
    ){};

    public getAllWishlistItems(custId:number):Observable<any>{
        const url = `${this.baseUrl}/wishlistItem/${custId}`;
        return this.httpClinet.get<any>(url,{responseType:'json'})
        .pipe(
            catchError(error=>{
                console.error(`Error occurred while fetching wishListItems for custId: ${custId}`, error);
                return throwError(() => new Error(`Failed to fetch wishListItems for custId: ${custId}`));
            })
        );
    }

    public addWishlistItem(wishlistDTO:WishlistDTO):Observable<any>{
        const url = `${this.baseUrl}/wishlistItem`;
        return this.httpClinet.post(url,wishlistDTO,{headers:this.headers}).pipe(
            catchError(error=>{
                console.log(`Error occurred while adding wishListItem for custId: ${wishlistDTO.CustomerDetailsId}`, error);
                return throwError(()=>new Error(`Failed to add wishListItem for custId: ${wishlistDTO.CustomerDetailsId}`));
            })
        )
    }

    public removeWishlistItem(id:number):Observable<any>{
        const url = `${this.baseUrl}/wishlistItem/${id}`;
        return this.httpClinet.delete(url,{responseType:"json"}).pipe(
            catchError(error=>{
                console.log(`Error occurred while deleting wishListItem for Id: ${id}`, error);
                return throwError(()=>new Error(`Failed to delete wishListItem for custId: ${id}`));
            })
        )
    }
}