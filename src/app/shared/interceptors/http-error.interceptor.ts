import {Injectable} from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';

import {SnackbarService} from '../services/local/snackbar.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private snackbarService: SnackbarService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          this.snackbarService
            .error(`Error Code: ${error.error?.statusCode}\nMessage: ${error.error.message}`);

          return throwError(error);
        })
      );
  }
}
