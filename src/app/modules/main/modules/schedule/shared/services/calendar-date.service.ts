import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import * as dayjs from 'dayjs'

@Injectable({providedIn: 'root'})
export class CalendarDateService {
  date = new BehaviorSubject<dayjs.Dayjs>(dayjs());

  changeMonth(direction: number): void {
    const newDate = this.date.value
      .clone()
      .add(direction, 'month');

    this.date.next(newDate);
  }
}
