import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import * as dayjs from "dayjs";

import {CalendarDateService} from "../../shared/services/calendar-date.service";

import {Week} from "../../shared/interfaces";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent implements OnInit {
  calendar: Week[] = [];

  constructor(
    private calendarDateService: CalendarDateService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.calendarDateService.date
      .subscribe(this.handleDateChange.bind(this))
  }

  handleDateChange(date: dayjs.Dayjs): void {
    const calendar = [];

    const todayDate = dayjs();
    const startDate = date.clone().startOf('month').startOf('week');
    const endDate = date.clone().endOf('month').endOf('week');

    let currentDate = startDate.clone().subtract(1, 'day');

    while (currentDate.isBefore(endDate, 'day')) {
      calendar.push({
        week: new Array(7)
          .fill(null)
          .map(() => {
            const value = currentDate.clone().add(1, 'day');
            const isToday = todayDate.isSame(currentDate, 'date');
            const isDisabled = !date.isSame(value, 'month');

            currentDate = currentDate.add(1, 'day');

            return {
              value,
              isToday,
              isDisabled,
              isActive: isToday,
              events: []
            }
          })
      })
    }

    this.calendar = calendar;
  }

  navigateToDetails(value: dayjs.Dayjs): void {
    const urlFragment = value.format('DD/MM/YYYY');
    this.router.navigate(['', 'schedule', urlFragment]);
  }
}
