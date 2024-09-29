import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { Product } from "../models/Product";
import { error } from "console";

@Injectable({
    providedIn:"root"
})
export class ProductsService{
    private baseUrl = 'http://localhost:9090/startcoding0to1/shopEasy';
    private header:HttpHeaders = new HttpHeaders({"Content-Type":"application/json"});

    constructor(private http:HttpClient){}

    public getAllProducts(category:string):Observable<Product[]>{
        const url = `${this.baseUrl}/products?category=${category}`;
        return this.http.get<Product[]>(url,{responseType:"json"}).pipe(
            catchError(error=>{
                console.error(`Error occurred while getting prodcuts of category :${category}`, error);
                return throwError(() => new Error(`Failed to get prodcuts of category :${category}`));
            })
        );
    }

    public getProductById(prodId:string):Observable<Product>{
        const url = `${this.baseUrl}/product/${prodId}`;
        return this.http.get<Product>(url,{responseType:'json'}).pipe(
            catchError(error=>{
                console.error(`Error occurred while getting prodcut for id :${prodId}`, error);
                return throwError(() => new Error(`Failed to get prodcut for id :${prodId}`));
            })
        )
    }
}