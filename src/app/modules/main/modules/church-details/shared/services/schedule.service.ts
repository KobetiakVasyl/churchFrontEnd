import {Injectable} from '@angular/core';
import {debounceTime, distinctUntilChanged, Subject} from "rxjs";

@Injectable({providedIn: 'root'})
export class ScheduleService {
  private readonly dateSource = new Subject<Date>();
  readonly eventDate$ = this.dateSource
    .asObservable()
    .pipe(
      debounceTime(500),
      distinctUntilChanged()
    );

  changeEventDate(value: Date): void {
    this.dateSource.next(value);
  }
}
