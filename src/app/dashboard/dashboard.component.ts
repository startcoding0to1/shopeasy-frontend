import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  categories: any[] = [
    { id: 1, name: "category 1"},
    { id: 2, name: "category 2"},
    { id: 3, name: "category 3"},
    { id: 4, name: "category 4"}
  ];

  products: any[] = [
    { id: 1, name: "Product 1", price: 10.99 },
    { id: 2, name: "Product 2", price: 20.49 },
    { id: 3, name: "Product 3", price: 15.99 },
    { id: 4, name: "Product 4", price: 25.99 },
    { id: 1, name: "Product 1", price: 10.99 },
    { id: 2, name: "Product 2", price: 20.49 },
    { id: 3, name: "Product 3", price: 15.99 },
    { id: 4, name: "Product 4", price: 25.99 },
    { id: 1, name: "Product 1", price: 10.99 },
    { id: 2, name: "Product 2", price: 20.49 },
    { id: 3, name: "Product 3", price: 15.99 },
    { id: 4, name: "Product 4", price: 25.99 },
    { id: 1, name: "Product 1", price: 10.99 },
    { id: 2, name: "Product 2", price: 20.49 },
    { id: 3, name: "Product 3", price: 15.99 },
    { id: 4, name: "Product 4", price: 25.99 }
  ];
}
