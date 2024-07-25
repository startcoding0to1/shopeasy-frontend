import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { LoginResultComponent } from "./login-result/login-result.component";

const routes: Routes = [
    {
        path: '',
        children: [
          {
            path: '', 
            redirectTo: 'signIn', // Redirect base path of 'auth' to 'signIn'
            pathMatch: 'full'// Ensure redirect only happens when the path is exactly empty
          },
          {
            path: 'signIn',
            component: LoginComponent
          },
          {
            path: 'signUp',
            component: SignUpComponent
          },
          {
            path:'signIn/:id',
            component:LoginResultComponent
          }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LoginRoutingModule { }
