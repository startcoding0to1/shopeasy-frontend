import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Roles } from '../../models/Roles';
import { UserDTO } from '../../models/UserDTO';

@Component({
  selector: 'app-seller-details',
  templateUrl: './seller-details.component.html',
  styleUrl: './seller-details.component.scss'
})
export class SellerDetailsComponent {
  userDetails:UserDTO = new UserDTO('1','Mahammad Khairuddin','Khadergari Shaik',6398554278,'khairu@gmail.com','',[Roles.CUSTOMER],'','','');;
  public roles:Roles[] = [Roles.CUSTOMER,Roles.SELLER,Roles.ADMIN];
  btnToggler:boolean=false;
  formControlToggler:boolean=!this.btnToggler;
  signUpForm:FormGroup = this.formBuilder.group({
    firstName : [this.userDetails.getUserFirstName,[Validators.required,nameValidator]],
    lastName : [this.userDetails.getUserLastName,[Validators.required,nameValidator]],
    emailId : [this.userDetails.getUserEmail,[Validators.required,emailIdValidator]],
    phoneNumber : [this.userDetails.getPhoneNumber,[Validators.required,phoneValidator]],
    password : ['',[Validators.required,passwordValidator]],
    confirmPassword : ['',[Validators.required,confirmPasswordValidator]],
    roles: this.formBuilder.group({
      customer: [false],
      seller: [false],
      admin: [{ value: false, disabled: true }]
    }, { validators: atLeastOneCheckboxValidator})
  });
  constructor(private formBuilder:FormBuilder,private router:Router,private activatedRoute:ActivatedRoute){}
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