import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {addMonths, subMonths} from "date-fns";

@Injectable({providedIn: 'root'})
export class CalendarDateService {
  date = new BehaviorSubject<Date>(new Date());

  changeMonth(loadNext: boolean): void {
    const newDate = loadNext
      ? addMonths(this.date.value, 1)
      : subMonths(this.date.value, 1);

    this.date.next(newDate);
  }
}
