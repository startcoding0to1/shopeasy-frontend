import { Injectable } from "@angular/core";
import { AuthResponse } from "../models/AuthResponse";
import { UserDTO } from "../models/UserDTO";
import { BehaviorSubject } from "rxjs";
import { CustomerDTO } from "../models/CustomerDTO";

@Injectable({
    providedIn: 'root'
  })
export class LocalStorageService {
    private loginStatusSubject = new BehaviorSubject<boolean>(this.getLoginStatus);
    public loginStatus$ = this.loginStatusSubject.asObservable();
    private custSubject = new BehaviorSubject<any>(this.getCustomer);
    custData$ = this.custSubject.asObservable(); 
    constructor(){};

    public set setUserDetails(userDetails:UserDTO | undefined){
        if(this.isLocalStorageAvailable()){
        localStorage.setItem("userDetails",JSON.stringify(userDetails));
        }
    }

    public get getUserDetails():any{
        if(this.isLocalStorageAvailable()){
            let userDetails:any = localStorage.getItem("userDetails");
            if(userDetails!==null){
                let plainObj = JSON.parse(userDetails);
                return new UserDTO(plainObj.userId,plainObj.userFirstName,plainObj.userLastName,plainObj.phoneNumber,plainObj.userEmail,plainObj.userPassword,plainObj.roles,plainObj.profilepic,plainObj.creationTime,plainObj.lastUpdateTime);
            }
        }
        return null;
    }

    public set setAuthResponse(authResponse:AuthResponse){
        if(this.isLocalStorageAvailable()){
        localStorage.setItem("authResponse",JSON.stringify(authResponse));
        }
        this.setUserDetails=authResponse.getUserDTO;
    }

    public get getAuthResponse():AuthResponse | null{
        if(this.isLocalStorageAvailable()){
            let authResponse = localStorage.getItem("authResponse");
            if(authResponse){
                let plainObj = JSON.parse(authResponse);
                return new AuthResponse(plainObj.message,plainObj.userDTO,plainObj.jwtToken);
            }
        }
        return null;
    }

    public get getLoginStatus():boolean{
        if(this.isLocalStorageAvailable()){
            let authResponse:string | null = localStorage.getItem("authResponse");
            return authResponse !==null ? true : false;
        }
        return false;
    }

    public clearUserdata(){
        if(this.isLocalStorageAvailable()){
        localStorage.clear();
        }
    }

    public set setCustomer(customerDto:CustomerDTO){
        if(this.isLocalStorageAvailable()){
            localStorage.setItem("customer",JSON.stringify(customerDto));
            this.custSubject.next(customerDto);
        }
    }

    public set setSeller(id:string){
        if(this.isLocalStorageAvailable()){
            localStorage.setItem("sellerId",JSON.stringify(id));
        }
    }

    public set setAdmin(id:string){
        if(this.isLocalStorageAvailable()){
            localStorage.setItem("adminId",JSON.stringify(id));
        }
    }

    public get getCustomer():any{
        if(this.isLocalStorageAvailable()){
            let cust = localStorage.getItem("customer");
            if(cust){
                const plainObj = JSON.parse(cust);
                return new CustomerDTO(plainObj.customerId,plainObj.userId,"",plainObj.wishlistDTOS,plainObj.cartDTOS,[]);
            }
        }
        return null;
    }

    public get getSeller():string | null{
        if(this.isLocalStorageAvailable()){
            return localStorage.getItem("sellerId");
        }
        return null;
    }

    public get getAdmin():string | null{
        if(this.isLocalStorageAvailable()){
            return localStorage.getItem("adminId");
        }
        return null;
    }

    public removeSeller():void{
        if(this.isLocalStorageAvailable()){
            localStorage.removeItem("sellerId");
        }
    }

    public removeAdmin():void{
        if(this.isLocalStorageAvailable()){
            localStorage.removeItem("adminId");
        }
    }

    public removeCustomer():void{
        if(this.isLocalStorageAvailable()){
            localStorage.removeItem("customer");
        }
    }
    private isLocalStorageAvailable(): boolean {
        try {
          const testKey = '__localStorageTest__';
          localStorage.setItem(testKey, testKey);
          localStorage.removeItem(testKey);
          return true;
        } catch (e) {
          return false;
        }
    }
}