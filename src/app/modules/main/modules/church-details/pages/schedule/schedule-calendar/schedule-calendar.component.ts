import {Component, OnInit} from '@angular/core';
import {fromEvent, map, Observable, startWith, timer} from "rxjs";
import {ScheduleService} from "../../../shared/services/schedule.service";
import {LayoutBreakpointsService} from "../../../../../../../shared/services/local/layout-breakpoints.service";
import {ScrollService} from "../../../../../../../shared/services/local/scroll.service";

@Component({
  selector: 'app-schedule-calendar',
  templateUrl: './schedule-calendar.component.html',
  styleUrls: ['./schedule-calendar.component.scss']
})
export class ScheduleCalendarComponent implements OnInit {
  selectedDate!: Date;
  calendarWidth$!: Observable<string>;

  constructor(
    public readonly layoutBreakpointsService: LayoutBreakpointsService,
    private readonly scrollService: ScrollService,
    private readonly scheduleService: ScheduleService
  ) {
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

    timer(200).subscribe(this.handleDateChange.bind(this, new Date()));
  }

  handleDateChange(value: Date): void {
    this.selectedDate = value;
    this.scheduleService.changeEventDate(this.selectedDate);
  }

  scrollToTop(): void {
    this.scrollService.scrollToTop()
  }
}
