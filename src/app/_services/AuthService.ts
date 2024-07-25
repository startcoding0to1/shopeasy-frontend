import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthRequest } from "../models/AuthRequest";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})
export class AuthService{

    baseUrl:string="http://localhost:9090/startcoding0to1/shopEasy/auth";
    private headers:HttpHeaders =new HttpHeaders({ 'Content-Type': 'application/json' });
    constructor(private httpClient:HttpClient){}

    public userAuthentication(authRequest:AuthRequest):Observable<any>{
        const response:Observable<any> = this.httpClient.post<any>(this.baseUrl+"/login",authRequest,{headers:this.headers});
        return response;
    }
}