import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
import {HttpInterceptor} from './interceptors/http.interceptor';
import {HttpErrorInterceptor} from './interceptors/http-error.interceptor';
import {LOCALE_ID} from '@angular/core';

const LOCALE_ID_PROVIDER = {
  provide: LOCALE_ID,
  useValue: 'uk'
};

const HTTP_INTERCEPTOR_PROVIDER = {
  provide: HTTP_INTERCEPTORS,
  useClass: HttpInterceptor,
  multi: true
};

const ERROR_INTERCEPTOR_PROVIDER = {
  provide: HTTP_INTERCEPTORS,
  useClass: HttpErrorInterceptor,
  multi: true
};

const MAT_DIALOG_PROVIDER = {
  provide: MAT_DIALOG_DEFAULT_OPTIONS,
  useValue: {
    disableClose: true
  }
};


export {
  LOCALE_ID_PROVIDER,
  ERROR_INTERCEPTOR_PROVIDER,
  HTTP_INTERCEPTOR_PROVIDER,
  MAT_DIALOG_PROVIDER
};
