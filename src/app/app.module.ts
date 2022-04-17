import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from "./shared/modules/material/material.module";
import {
  MAT_FORM_FIELD_PROVIDER,
  MAT_DIALOG_PROVIDER,
  HTTP_TOKEN_INTERCEPTOR_PROVIDER,
  HTTP_ERROR_INTERCEPTOR_PROVIDER
} from './shared/providers/index.provider';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    MAT_FORM_FIELD_PROVIDER,
    MAT_DIALOG_PROVIDER,
    HTTP_TOKEN_INTERCEPTOR_PROVIDER,
    HTTP_ERROR_INTERCEPTOR_PROVIDER
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
