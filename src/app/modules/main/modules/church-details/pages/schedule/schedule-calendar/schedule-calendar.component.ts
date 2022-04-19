import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {fromEvent, map, Observable, startWith} from "rxjs";

@Component({
  selector: 'app-schedule-calendar',
  templateUrl: './schedule-calendar.component.html',
  styleUrls: ['./schedule-calendar.component.scss']
})
export class ScheduleCalendarComponent implements OnInit {
  selectedDate = new Date();
  calendarWidth$!: Observable<string>;

  constructor() {
  }

  ngOnInit(): void {
    // set width for calendar as currently dynamic
    // width even in percentage is not working
    // Angular material (v.13.3.3)
    this.calendarWidth$ = fromEvent(window, 'resize').pipe(
      startWith(() => document.body.clientWidth),
      map(() => `${document.body.clientWidth - 65}px`)
    )
  }
}
