import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import {FlexLayoutModule} from "@angular/flex-layout";
import {QuillModule} from "ngx-quill";

import dayjs from 'dayjs';
import 'dayjs/locale/uk';

import {MaterialModule} from "./shared/modules/material.module";
import {AppRoutingModule} from './app-routing.module';

import {ERROR_INTERCEPTOR_PROVIDER, MAT_DIALOG_PROVIDER} from "./shared/providers";

import {AppComponent} from './app.component';
import {LoadingSpinnerComponent} from './shared/components/loading-spinner/loading-spinner.component';
import {MessagePopUpComponent} from './shared/components/message-pop-up/message-pop-up.component';

@NgModule({
  declarations: [AppComponent, LoadingSpinnerComponent, MessagePopUpComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    QuillModule.forRoot()
  ],
  providers: [
    ERROR_INTERCEPTOR_PROVIDER,
    MAT_DIALOG_PROVIDER
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
