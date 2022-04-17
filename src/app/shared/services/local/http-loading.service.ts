import { Injectable } from '@angular/core';
import {BehaviorSubject, delay} from "rxjs";

@Injectable({providedIn: 'root'})
export class HttpLoadingService {
  private static readonly showLoadingSource = new BehaviorSubject<boolean>(false);
  static readonly showLoading$ = HttpLoadingService.showLoadingSource.asObservable().pipe(delay(0));

  static startLoading(): void {
    HttpLoadingService.showLoadingSource.next(true);
  }

  static stopLoading(): void {
    HttpLoadingService.showLoadingSource.next(false);
  }
}
