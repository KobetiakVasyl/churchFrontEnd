import { Injectable } from '@angular/core';
import {debounceTime, ReplaySubject, startWith} from "rxjs";

@Injectable({providedIn: 'root'})
export class AdminScheduleBrokerService {
  private readonly dateSource = new ReplaySubject<Date>(1);
  readonly date$ = this.dateSource
    .asObservable()
    .pipe(
      debounceTime(500),
      startWith(new Date())
    );

  changeDate(value: Date): void {
    this.dateSource.next(value);
  }
}
