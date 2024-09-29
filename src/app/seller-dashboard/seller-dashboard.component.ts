import { Component } from '@angular/core';
import { LocalStorageService } from '../_services/LocalStorageService';
import { Roles } from '../models/Roles';

@Component({
  selector: 'app-seller-dashboard',
  templateUrl: './seller-dashboard.component.html',
  styleUrl: './seller-dashboard.component.scss'
})
export class SellerDashboardComponent {
  currentTime: string = new Date().toISOString();
  constructor(private localStorageService:LocalStorageService){}
  loginStatus:boolean = false;
  userName!:string;
  userRole:Roles = Roles.CUSTOMER;
  ngOnInit() {
    this.loginStatus = this.localStorageService.getLoginStatus;
    this.userName = this.loginStatus ? this.localStorageService.getUserDetails?.getUserFirstName+"" : "UserName";
  }
  logOut() {
    this.localStorageService.clearUserdata();
    this.loginStatus = this.localStorageService.getLoginStatus;
  }
}
