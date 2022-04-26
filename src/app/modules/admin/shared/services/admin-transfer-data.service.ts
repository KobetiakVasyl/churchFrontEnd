import {Injectable} from '@angular/core';
import {BehaviorSubject, delay} from "rxjs";

@Injectable({providedIn: 'root'})
export class AdminTransferDataService {
  private readonly toolbarTitleSource = new BehaviorSubject<string>('admin');

  readonly toolbarTitle$ = this.toolbarTitleSource
    .asObservable()
    .pipe(delay(0))

  changeToolbarTitle(value: string): void {
    this.toolbarTitleSource.next(value);
  }
}
