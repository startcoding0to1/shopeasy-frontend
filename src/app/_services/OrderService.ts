import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CustomerOrderDTO } from "../models/CustomerOrderDTO";
import { catchError, Observable, throwError } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class OrderService{
    private baseUrl:string="http://localhost:9090/startcoding0to1/shopEasy/";
    private headers:HttpHeaders = new HttpHeaders({'content-Tyoe':'application/json'});
    constructor(
        private httpClient:HttpClient
    ){}

    public placeOrder(customerOrder:CustomerOrderDTO):Observable<any>{
        const url = `${this.baseUrl}/order`;
        return this.httpClient.post(url,customerOrder,{headers:this.headers}).pipe(
            catchError(error=>{
                console.log(`Error occured while placing order for customer: ${customerOrder.customerId}`)
                return throwError(()=>{`Failed to place order for customer: ${customerOrder.customerId}`});
            })
        );
    }
}