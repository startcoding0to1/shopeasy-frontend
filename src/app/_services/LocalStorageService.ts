import { Injectable } from "@angular/core";
import { AuthResponse } from "../models/AuthResponse";
import { UserDTO } from "../models/UserDTO";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
export class LocalStorageService {
    private loginStatusSubject = new BehaviorSubject<boolean>(this.getLoginStatus);
    public loginStatus$ = this.loginStatusSubject.asObservable();
    constructor(){};

    public set setUserDetails(userDetails:JSON){
        localStorage.setItem("userDetails",JSON.stringify(userDetails));
    }

    public get getUserDetails():UserDTO | null{
        let userDetails:string | null = localStorage.getItem("userDetails");
        return userDetails ? JSON.parse(userDetails) : null;
    }

    public set setAuthResponse(authResponse:AuthResponse){
        localStorage.setItem("authResponse",JSON.stringify(authResponse));
    }

    public get getLoginStatus():boolean{
        if(this.isLocalStorageAvailable()){
            let authResponse:string | null = localStorage.getItem("authResponse");
            return authResponse ? true : false;
        }
        return false;
    }

    public clearUserdata(){
        localStorage.clear();
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