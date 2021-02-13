import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {finalize} from "rxjs/operators";

import {LoadingSpinnerService} from "../services/loading-spinner.service";

@Injectable()
export class HttpInterceptor implements HttpInterceptor {

  constructor(private loadingSpinnerService: LoadingSpinnerService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loadingSpinnerService.startLoading();

    return next.handle(request)
      .pipe(finalize(() => this.loadingSpinnerService.stopLoading()));
  }
}
