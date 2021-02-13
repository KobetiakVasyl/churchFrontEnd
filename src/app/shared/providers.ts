import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {MAT_DIALOG_DEFAULT_OPTIONS} from "@angular/material/dialog";
import {HttpErrorInterceptor} from "./interceptors/http-error.interceptor";

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
}


export {
  ERROR_INTERCEPTOR_PROVIDER,
  MAT_DIALOG_PROVIDER
}
