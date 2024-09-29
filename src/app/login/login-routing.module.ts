import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { LoginResultComponent } from "./login-result/login-result.component";
import { SignInComponent } from "./sign-in/sign-in.component";

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
            component: SignInComponent
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
