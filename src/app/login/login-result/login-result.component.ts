import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Roles } from '../../models/Roles';

@Component({
  selector: 'app-login-result',
  templateUrl: './login-result.component.html',
  styleUrl: './login-result.component.scss'
})
export class LoginResultComponent implements OnInit{
  loginStatus:boolean = false;
  roles:Roles[]=[Roles.CUSTOMER,Roles.SELLER];

  constructor(private activatedRoute:ActivatedRoute,private router:Router){}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(param=>{
      console.log(param.get('id'))
      const liginStatus = param.get('id');
      if(liginStatus === 'success'){
        this.loginStatus = true;
      }
    });
  }

  navigateTo(role:any){
    if(role === Roles.CUSTOMER){
      this.router.navigate(['/header']);
    }
    else if(role === Roles.SELLER){
      this.router.navigate(['/dashboard']);
    }
    else if(role === Roles.ADMIN){

    }
  }
}
