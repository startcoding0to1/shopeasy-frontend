import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Roles } from '../../models/Roles';
import { UserDTO } from '../../models/UserDTO';
import { AuthService } from '../../_services/AuthService';
import { LocalStorageService } from '../../_services/LocalStorageService';
import { AuthResponse } from '../../models/AuthResponse';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnInit{
  constructor(private formBuilder:FormBuilder,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private authService:AuthService,
    private localStorageService:LocalStorageService){}
  public rolesArr:Roles[] = [Roles.CUSTOMER,Roles.SELLER,Roles.ADMIN];
  signUpForm:FormGroup = this.formBuilder.group({
    firstName : ['',[Validators.required,nameValidator]],
    lastName : ['',[Validators.required,nameValidator]],
    emailId : ['',[Validators.required,emailIdValidator]],
    phoneNumber : ['',[Validators.required,phoneValidator]],
    password : ['',[Validators.required,passwordValidator]],
    confirmPassword : ['',[Validators.required,confirmPasswordValidator]],
    roles: this.formBuilder.group({
      customer: [false],
      seller: [false],
      admin: [{ value: false, disabled: true }]
    }, { validators: atLeastOneCheckboxValidator})
  });
  
  onSubmit(){
    let formFields = this.signUpForm.value;
    let userRoles :  Roles[] = Object.keys(formFields.roles).filter((role) => formFields.roles[role]).map((role) => {
      let roleKey = role.toUpperCase() as keyof typeof Roles;
      return Roles[roleKey];
    });
    let userDTO:UserDTO = new UserDTO('',formFields.firstName,formFields.lastName,formFields.phoneNumber,formFields.emailId,formFields.password,userRoles,'','','');
    console.log(JSON.stringify(userDTO ))
    this.authService.userRegister(userDTO).subscribe({
      next:(response:any)=>{
        let authResponse = new AuthResponse(response.message, response.userDTO, response.jwtToken);
        this.router.navigate(['/auth/signIn','success']);
       if (authResponse.getMessage === "User successfully registered.") {
          this.localStorageService.setAuthResponse = authResponse;
          this.router.navigate(['/auth/signIn','success']);
        } else {
          this.router.navigate(['/auth/signIn','failure']);
        }
      },
      error: (err: any) => {
        this.router.navigate(['/auth/signIn','failure']);
      }
    });
  }
  ngOnInit(){

  }

  goBackToLogin(){
    this.router.navigate(["/signIn"],{queryParams:{loginFailed:true}})
  }
}

function phoneValidator(phoneNumber:FormControl):any{
  const PHONE_REGEXP = /^[6-9]+[0-9]{9}$/;
  return (PHONE_REGEXP.test(phoneNumber.value) || !phoneNumber.value)?null:
  {
    phoneNumberError:{
      message:"Phone number is Invalid {Eg: 96XXXXXX04}" 
    }
  }
}


function emailIdValidator(emailId:FormControl):any{
  const EAMAIL_REGEXP = /^([a-zA-Z]{1})([a-zA-Z0-9\-\.\_]{5,})@gmail\.(com)$/;
  return (EAMAIL_REGEXP.test(emailId.value) || !emailId.value)?null:
  {
    emailIdError:{
      message:"Email Id is invalid {Eg: abc_b10@gmail.com}"
    }
  }
}

function nameValidator(firstName:FormControl):any {
  const NAME_REGEXP = /^([A-Z]{1}[a-z]+(\s[A-Z]{1}[a-z]+)*){1,2}$/;
  return (NAME_REGEXP.test(firstName.value) || !firstName.value)?null:{
    nameError : {
      message : "First name is invalid {Eg: Khairu}"
    }
  };
}
let password:string;
let confirmPassword:string;
function confirmPasswordValidator(confirmPwd:FormControl){
  confirmPassword = confirmPwd.value;
  return (confirmPassword === password || !confirmPassword)?null:{
    confirmPwdError : {
      message : "Confirm password doesn't match with password"
    }
  };
}

function passwordValidator(pwd:FormControl){ 
  password = pwd.value;
  const PWD_REGEXP = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return (PWD_REGEXP.test(pwd.value) || !pwd.value)?null:{
    passwordError : {
      message : "Password is invalid required min 8 char {Eg: Abcd@123}"
    }
  }
}

//FYI
// ^: Asserts the start of the string.
// (?=.*[a-z]): Asserts that there is at least one lowercase letter.
// (?=.*[A-Z]): Asserts that there is at least one uppercase letter.
// (?=.*\d): Asserts that there is at least one digit.
// (?=.*[@$!%*?&]): Asserts that there is at least one special character.
// [A-Za-z\d@$!%*?&]{8,}: Matches any combination of the allowed characters (uppercase, lowercase, digit, special character) with a minimum length of 8 characters.
// $: Asserts the end of the string.

function atLeastOneCheckboxValidator(control: AbstractControl): ValidationErrors | null {
  const controls = (control as FormGroup).controls;
  if (controls) {
    const anyChecked = Object.keys(controls).some(key => controls[key].value === true);    
    if (!anyChecked) {
      return { 
        atLeastOneCheckboxRequired: {
          message:"At least one role must be selected."
        }
       };
    }
  }
  return null;
}

