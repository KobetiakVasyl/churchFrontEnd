import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {finalize} from "rxjs/operators";

import {LoadingSpinnerService} from "../services/loading-spinner.service";
import {AuthService} from "../../modules/auth/shared/services/auth.service";

@Injectable()
export class HttpInterceptor implements HttpInterceptor {

  constructor(
    private loadingSpinnerService: LoadingSpinnerService,
    private authService: AuthService
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // this.loadingSpinnerService.startLoading();
    if (this.authService.isAuthorized()) {
      const requestWithToken = request.clone({
        setHeaders: {
          Authorization: <string>localStorage.getItem('token')
        }
      })

      return next.handle(requestWithToken);
    } else {
      return next.handle(request);
      // .pipe(finalize(() => this.loadingSpinnerService.stopLoading()));
    }
  }
}
