import {Injectable} from '@angular/core';
import {BehaviorSubject, delay, Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthTransferDataService {
  private readonly toolbarTitleSource = new BehaviorSubject<string>('auth');

  readonly toolbarTitle$ = this.toolbarTitleSource
    .asObservable()
    .pipe(delay(0))

  changeToolbarTitle(value: string): void {
    this.toolbarTitleSource.next(value);
  }
}
