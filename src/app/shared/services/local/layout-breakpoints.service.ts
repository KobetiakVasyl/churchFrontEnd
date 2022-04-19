import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({providedIn: 'root'})
export class LayoutBreakpointsService {
  readonly extraSmallMatch$ = new BehaviorSubject<boolean>(false);
  readonly smallMatch$ = new BehaviorSubject<boolean>(false);
  readonly mediumMatch$ = new BehaviorSubject<boolean>(false);
  readonly largeMatch$ = new BehaviorSubject<boolean>(false);
  readonly extraLargeMatch$ = new BehaviorSubject<boolean>(false);

  changeExtraSmallMatch(value: boolean): void {
    this.extraSmallMatch$.next(value);
  }

  changeSmallMatch(value: boolean): void {
    this.smallMatch$.next(value);
  }

  changeMMediumMatch(value: boolean): void {
    this.mediumMatch$.next(value);
  }

  changeLargeMatch(value: boolean): void {
    this.largeMatch$.next(value);
  }

  changeXExtraLargeMatch(value: boolean): void {
    this.extraLargeMatch$.next(value);
  }
}
