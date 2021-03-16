import {Injectable} from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from "rxjs/operators";

import {SnackbarService} from "../services/snackbar.service";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private snackbarService: SnackbarService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          const errorMessage = error.error instanceof ErrorEvent
            ? `Error: ${error.error.message}`
            : `Error Code: ${error.status}\nMessage: ${error.message}`;

          this.snackbarService.error(errorMessage);

          return throwError(errorMessage);
        })
      )
  }
}
