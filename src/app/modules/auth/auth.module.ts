import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../shared/modules/material.module";
import {FlexLayoutModule, FlexModule} from "@angular/flex-layout";
import {AuthRoutingModule} from "./auth-routing.module";

import {AuthLayoutComponent} from './shared/components/auth-layout/auth-layout.component';
import {SignUpPageComponent} from './components/sign-up-page/sign-up-page.component';
import {SignInPageComponent} from "./components/sign-in-page/sign-in-page.component";
import {ResetPasswordPageComponent} from './components/reset-password-page/reset-password-page.component';
import {ForgotPasswordPageComponent} from './components/forgot-password-page/forgot-password-page.component';


@NgModule({
  declarations: [
    AuthLayoutComponent,
    SignInPageComponent,
    SignUpPageComponent,
    ResetPasswordPageComponent,
    ForgotPasswordPageComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    FlexLayoutModule,
    FlexModule
  ],
})
export class AuthModule {
}
