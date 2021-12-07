import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthLayoutComponent} from './shared/components/auth-layout/auth-layout.component';
import {SignInPageComponent} from './components/sign-in-page/sign-in-page.component';
import {SignUpPageComponent} from './components/sign-up-page/sign-up-page.component';
import {CanActivateAuthModuleGuard} from '../../shared/guards/can-activate-auth-module.guard';
import {ResetPasswordPageComponent} from './components/reset-password-page/reset-password-page.component';
import {ForgotPasswordPageComponent} from './components/forgot-password-page/forgot-password-page.component';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        component: SignInPageComponent,
        canActivate: [CanActivateAuthModuleGuard]
      },
      {
        path: 'signup',
        component: SignUpPageComponent,
        canActivate: [CanActivateAuthModuleGuard]
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordPageComponent,
        canActivate: [CanActivateAuthModuleGuard]
      },
      {
        path: 'reset-password',
        component: ResetPasswordPageComponent,
        canActivate: [CanActivateAuthModuleGuard]
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
