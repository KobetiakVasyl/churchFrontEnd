import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpStatusCode
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(response => {
        console.error(response);

        if (response.status === 0) {
          return throwError(() => ({message: 'Could not load information', statusCode: 503}));
        } else if (response.hasOwnProperty('error')) {
          return throwError(response.error);
        } else {
          return throwError(() => ({message: response.statusText, statusCode: response.status}));
        }
      })
    )
  }
}
