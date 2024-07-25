import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../_services/LocalStorageService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  constructor(private localStorageService:LocalStorageService){}
  loginStatus:boolean=false;

  ngOnInit() {
    this.loginStatus = this.localStorageService.getLoginStatus;
  }

  logOut() {
    this.localStorageService.clearUserdata();
    this.loginStatus = this.localStorageService.getLoginStatus;
  }
}
