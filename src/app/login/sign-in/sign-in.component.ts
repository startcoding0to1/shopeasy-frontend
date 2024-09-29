import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../_services/AuthService';
import { LocalStorageService } from '../../_services/LocalStorageService';
import { NgForm } from '@angular/forms';
import { AuthRequest } from '../../models/AuthRequest';
import { AuthResponse } from '../../models/AuthResponse';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  formSubmit:boolean = false;
  loginSuccessful:boolean = false;

  constructor(private authService:AuthService,private localStorageService:LocalStorageService,
    private router:Router,private activatedRoute:ActivatedRoute){}

  onSubmit(loginForm: NgForm) {
    let authRequest: AuthRequest = new AuthRequest(loginForm.value.userEmail, loginForm.value.userPassword); 
    this.authService.userAuthentication(authRequest).subscribe({
      next: (response: any) => {
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
}
