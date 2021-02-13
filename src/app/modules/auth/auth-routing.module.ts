import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthLayoutComponent} from "./shared/components/auth-layout/auth-layout.component";
import {SignInPageComponent} from "./components/sign-in-page/sign-in-page.component";
import {SignUpPageComponent} from "./components/sign-up-page/sign-up-page.component";

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        component: SignInPageComponent
      },
      {
        path: 'signup',
        component: SignUpPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
