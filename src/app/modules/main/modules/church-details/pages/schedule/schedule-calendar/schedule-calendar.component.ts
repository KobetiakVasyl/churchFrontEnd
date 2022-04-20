import {Component, OnInit} from '@angular/core';
import {fromEvent, map, Observable, startWith, timer} from "rxjs";
import {ScheduleService} from "../../../shared/services/schedule.service";

@Component({
  selector: 'app-schedule-calendar',
  templateUrl: './schedule-calendar.component.html',
  styleUrls: ['./schedule-calendar.component.scss']
})
export class ScheduleCalendarComponent implements OnInit {
  selectedDate = new Date();
  calendarWidth$!: Observable<string>;

  constructor(private readonly scheduleService: ScheduleService) {
  }

  ngOnInit(): void {
    // set width for calendar as currently dynamic
    // width even in percentage is not working
    // Angular material (v.13.3.3)
    this.calendarWidth$ = fromEvent(window, 'resize').pipe(
      startWith(() => document.body.clientWidth),
      map(() => {
        const value = document.body.clientWidth > 400 ? 400 : document.body.clientWidth;
        return `${value - 65}px`
      })
    );

    timer(200).subscribe(this.handleDateChange.bind(this));
  }

  handleDateChange(): void {
    const day = this.selectedDate.getDate() + 1;
    const month = this.selectedDate.getMonth();
    const year = this.selectedDate.getFullYear();

    const date = new Date(year, month, day, 0, 0, 0);

    this.scheduleService.changeEventDate(date);
  }
}
