import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { error } from "console";
import { catchError, Observable, throwError } from "rxjs";
import { Communication } from "../models/Communication";

@Injectable({
    providedIn:'root'
})
export class CommunicationService{
    baseUrl:string="http://localhost:9090/startcoding0to1/shopEasy";
    private headers:HttpHeaders = new HttpHeaders({'Content-Type':'application/json'});
    constructor(private httpClient:HttpClient){}

    public getOTP(communication:Communication):Observable<any>{
        const url = `${this.baseUrl}/sms`;
        return this.httpClient.post<any>(url,communication).pipe(
            catchError(error=>{
                console.log('Error occurred while getting OTP for customer:'+communication.userName,error);
                return throwError(()=>`Failed to get OTP for customer: ${communication.userName}`);
            })
        );
    }
}