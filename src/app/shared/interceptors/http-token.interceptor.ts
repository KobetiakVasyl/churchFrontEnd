import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {finalize, Observable} from 'rxjs';
import {HttpLoadingService} from "../services/local/http-loading.service";
import {TokenService} from "../services/local/token.service";
import {ELocalStorage} from "../enums/local-storage.enums";

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    HttpLoadingService.startLoading()

    if (TokenService.isAuthorized()) {
      request = request.clone({
        setHeaders: {
          Authorization: localStorage.getItem(ELocalStorage.TOKEN) as string
        }
      });
    }

    return next.handle(request)
      .pipe(finalize(() => HttpLoadingService.stopLoading()));
  }
}
