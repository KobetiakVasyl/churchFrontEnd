import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import {Observable} from 'rxjs';

import {LoadingSpinnerService} from '../services/local/loading-spinner.service';
import {TokenService} from '../services/local/token.service';

@Injectable()
export class HttpInterceptor implements HttpInterceptor {

  constructor(
    private loadingSpinnerService: LoadingSpinnerService,
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // this.loadingSpinnerService.startLoading();
    if (TokenService.isAuthorized()) {
      const requestWithToken = request.clone({
        setHeaders: {
          Authorization: localStorage.getItem('token') as string
        }
      });

      return next.handle(requestWithToken);
    } else {
      return next.handle(request);
      // .pipe(finalize(() => this.loadingSpinnerService.stopLoading()));
    }
  }
}
