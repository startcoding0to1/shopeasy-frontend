import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'shopeasy-frontend';
  constructor(
    private route : Router
  ){}
  ngOnInit(): void {
    this.route.navigate(['']);
  }  
}
