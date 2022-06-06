import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthLayoutComponent} from "./shared/components/auth-layout/auth-layout.component";
import {SignInComponent} from "./pages/sign-in/sign-in.component";
import {AuthSelectActionComponent} from "./pages/auth-select-action/auth-select-action.component";
import {ForgotPasswordComponent} from "./pages/forgot-password/forgot-password.component";
import {ResetPasswordComponent} from "./pages/reset-password/reset-password.component";
import {SignUpComponent} from "./pages/sign-up/sign-up.component";
import { AuthenticationGuard } from 'src/app/shared/guards/authentication.guard';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        component: AuthSelectActionComponent
      },
      {
        path: 'sign-in',
        component: SignInComponent,
        canActivate: [AuthenticationGuard]
      },
      {
        path: 'sign-up',
        component: SignUpComponent,
        canActivate: [AuthenticationGuard]
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        canActivate: [AuthenticationGuard]
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent,
        canActivate: [AuthenticationGuard]
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
