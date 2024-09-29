import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LocalStorageService } from '../../_services/LocalStorageService';
import { CustomerOrderDTO } from '../../models/CustomerOrderDTO';
import { CommunicationService } from '../../_services/CommunicationService';
import { Communication } from '../../models/Communication';
import { NgForm } from '@angular/forms';
import { UserDTO } from '../../models/UserDTO';
import { Router } from '@angular/router';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrl: './place-order.component.scss'
})
export class PlaceOrderComponent implements OnInit{
  customerOrderDTO:CustomerOrderDTO | null = null;
  userDetails!:UserDTO;
  userName!:string;
  otp!:string;
  otpFlag:boolean=false;
  message:string = "Your OTP successfully verified...🙂";
  isSubmitted: boolean = false;

  @Output() orderFlag = new EventEmitter<boolean>();

  // @Input() set customerOrderDTO(customerOrderDTO:CustomerOrderDTO | null){
  //   this.customerOrderDto =customerOrderDTO;
  // }

  constructor(
    private localstorage:LocalStorageService,
    private communicationService:CommunicationService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.userDetails =this.localstorage.getUserDetails;
    const navigationState = window.history.state;
    if (navigationState && navigationState.customerOrderDTO) {
      this.customerOrderDTO = navigationState.customerOrderDTO;
    } else {
      console.log('No customerOrderDTO found in navigation state');
    }
    console.log("ORDER: "+JSON.stringify(this.customerOrderDTO))
    this.sendOTP();
  }  
  sendOTP(){
    let communication!:Communication;
    if(this.userDetails){
      communication = {userName:this.userDetails.getUserFirstName,phoneNo:"+91 76598 87843",message:'otp'};
      this.userName = this.userDetails.getUserFirstName;
    }else{
      throw new Error('User details null');
    }
    // this.communicationService.getOTP(communication).subscribe({
    //   next:(response:any)=>{
    //     this.otp = response.id;
    //     console.log(JSON.stringify(response));
    //   },
    //   error:(err:any)=>{
    //     console.log(err);
    //   }
    // })
  }
  moveToNext(currentInput: HTMLInputElement, nextInput?: HTMLInputElement) {
    if (currentInput.value.length === 1 && nextInput) {
        nextInput.focus(); // Move focus to the next input
    }
  }
  Onsubmit(otpForm:NgForm){
    this.isSubmitted = true;
    console.log(JSON.stringify(otpForm.value))
    const enteredOTP = otpForm.value.dig1+otpForm.value.dig2+otpForm.value.dig3+otpForm.value.dig4;
    if(enteredOTP === this.otp){
      this.otpFlag =true;
    }
  }
  goBack(){
    console.log("Coming - 1")
    this.orderFlag.emit(false)
  }
}
