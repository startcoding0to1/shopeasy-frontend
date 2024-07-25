import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/AuthService';
import { NgForm } from '@angular/forms';
import { error } from 'console';
import { AuthRequest } from '../models/AuthRequest';
import { AuthResponse } from '../models/AuthResponse';
import { LocalStorageService } from '../_services/LocalStorageService';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  formSubmit:boolean = false;
  loginSuccessful:boolean = false;

  constructor(private authService:AuthService,private localStorageService:LocalStorageService,
    private router:Router,private activatedRoute:ActivatedRoute){}

  onSubmit(loginForm: NgForm) {
    let authRequest: AuthRequest = new AuthRequest(loginForm.value.userEmail, loginForm.value.userPassword); 
    this.authService.userAuthentication(authRequest).subscribe({
      next: (response: any) => {
        console.log(response)
        let authResponse = new AuthResponse(response.message, response.userDTO, response.jwtToken);
        
        if (authResponse.getMessage === "User successfully Login.") {
          this.localStorageService.setAuthResponse = authResponse;
          this.formSubmit = true;
          this.loginSuccessful = true;
          this.router.navigate(['/auth/signIn','success']);
        } else {
          this.formSubmit = true;
          this.router.navigate(['/auth/signIn','failure']);
        }
      },
      error: (err: any) => {
        this.formSubmit = true;
        this.router.navigate(['/auth/signIn','failure']);
      }
    });
  }

  ngOnInit() {
    
  }
}