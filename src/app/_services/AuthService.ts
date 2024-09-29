import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { AuthRequest } from "../models/AuthRequest";
import { Injectable } from "@angular/core";
import { UserDTO } from "../models/UserDTO";

@Injectable({
    providedIn:'root'
})
export class AuthService{

    baseUrl:string="http://localhost:9090/startcoding0to1/shopEasy/auth";
    private headers:HttpHeaders =new HttpHeaders({ 'Content-Type': 'application/json' });
    constructor(private httpClient:HttpClient){}

    public userAuthentication(authRequest:AuthRequest):Observable<any>{
        return this.httpClient.post<any>(this.baseUrl+"/login",authRequest,{headers:this.headers}).pipe(
            catchError(error=>{
                console.log('Error occurred while user register:',error);
                return throwError(() => error);
            })
        );
       
    }
    public userRegister(userDTO:UserDTO){
        return this.httpClient.post<Observable<any>>(this.baseUrl+"/register",userDTO,{headers:this.headers}).pipe(
            catchError(error=>{
                console.log('Error occurred while user register:',error);
                return throwError(() => error);
            })
        );
    }
}