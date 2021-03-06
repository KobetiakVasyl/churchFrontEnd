import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

import {
  format,
  isBefore,
  isSameDay,
  isSameMonth,
  startOfMonth,
  endOfMonth,
  subDays,
  addDays,
} from 'date-fns'
import { uk } from 'date-fns/locale'

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

  handleDateChange(date: Date): void {
    const calendar = [];

    const todayDate = new Date();
    const startDate = startOfMonth(date);
    const endDate = endOfMonth(date);

    let currentDate = subDays(startDate, 1);

    console.log(
      format(todayDate, 'MM/dd/yyyy'),
      format(startDate, 'MM/dd/yyyy'),
      format(endDate, 'MM/dd/yyyy'),
      format(currentDate, 'MM/dd/yyyy')
    );

    while (isBefore(currentDate, endDate)) {
      calendar.push({
        week: new Array(7)
          .fill(null)
          .map(() => {
            const pure = addDays(currentDate, 1);
            const formatted = format(currentDate, 'dd', {locale: uk});
            const isToday = isSameDay(todayDate, currentDate);
            const isDisabled = !isSameMonth(todayDate, currentDate);

            currentDate = addDays(currentDate, 1);

            return {
              isToday,
              isDisabled,
              value: {pure, formatted},
              events: []
            }
          })
      })
    }
    console.log(calendar);
    this.calendar = calendar;
  }

  navigateToDetails(value: Date): void {
    const urlFragment = format(value, 'dd/MM/yyyy');
    this.router.navigate(['', 'schedule', urlFragment]);
  }
}
