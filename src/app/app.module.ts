import { NgbModule } from '@ng-bootstrap/ng-bootstrap';import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { SellerDashboardComponent } from './seller-dashboard/seller-dashboard.component';
import { HeaderModule } from './header/header.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    SellerDashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    HeaderModule
   ],
  providers: [
    provideHttpClient(withFetch()), // Configure HttpClient to use fetch API
    provideClientHydration() // Only needed for SSR
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }