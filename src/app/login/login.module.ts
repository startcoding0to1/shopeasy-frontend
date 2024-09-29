import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginResultComponent } from './login-result/login-result.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';
import { EmailValidatorDirective } from './email-validator.directive';
import { SignInComponent } from './sign-in/sign-in.component';



@NgModule({
  declarations: [
    LoginComponent,
    LoginResultComponent,
    SignUpComponent,
    EmailValidatorDirective,
    SignInComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
