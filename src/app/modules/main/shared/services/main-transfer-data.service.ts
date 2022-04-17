import { Injectable } from '@angular/core';
import {BehaviorSubject, delay} from "rxjs";

@Injectable({providedIn: 'root'})
export class MainTransferDataService {
  private readonly toolbarTitleSource = new BehaviorSubject<string>('main');

  readonly toolbarTitle$ = this.toolbarTitleSource
    .asObservable()
    .pipe(delay(0))

  changeToolbarTitle(value: string): void {
    this.toolbarTitleSource.next(value);
  }
}
