import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {AuthLayoutComponent} from './shared/components/auth-layout/auth-layout.component';
import {MaterialModule} from "../../shared/modules/material/material.module";
import {SignInComponent} from './pages/sign-in/sign-in.component';
import {AuthSelectActionComponent} from './pages/auth-select-action/auth-select-action.component';
import {ReactiveFormsModule} from "@angular/forms";
import {ForgotPasswordComponent} from './pages/forgot-password/forgot-password.component';
import {ResetPasswordComponent} from './pages/reset-password/reset-password.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

@NgModule({
  declarations: [
    AuthLayoutComponent,
    SignInComponent,
    AuthSelectActionComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ]
})
export class AuthModule {
}
