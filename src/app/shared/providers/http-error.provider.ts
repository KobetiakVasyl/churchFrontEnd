import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {HttpErrorInterceptor} from "../interceptors/http-error.interceptor";

export const HTTP_ERROR_INTERCEPTOR_PROVIDER = {
  provide: HTTP_INTERCEPTORS,
  useClass: HttpErrorInterceptor,
  multi: true
};
