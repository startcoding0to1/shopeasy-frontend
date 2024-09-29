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
export class LoginComponent{
  
}