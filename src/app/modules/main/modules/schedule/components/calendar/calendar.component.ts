import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {
  format,
  isBefore,
  isSameDay,
  isSameMonth,
  startOfMonth,
  endOfMonth,
  subDays,
  addDays,
} from 'date-fns';
import {uk} from 'date-fns/locale';

import {CalendarDateService} from '../../shared/services/calendar-date.service';

import {Week} from '../../shared/interfaces';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent implements OnInit {
  editEnabled = true;

  calendar: Week[] = [];

  @Output() dateSelected = new EventEmitter<Date>();

  constructor(
    private calendarDateService: CalendarDateService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.route.data
      .subscribe(data => this.editEnabled = data.editEnabled);

    this.calendarDateService.date
      .subscribe(this.handleDateChange.bind(this));
  }

  handleDateChange(date: Date): void {
    const calendar = [];

    const todayDate = new Date();
    const startDate = startOfMonth(date);
    const endDate = endOfMonth(date);

    let currentDate = subDays(startDate, 1);

    while (isBefore(currentDate, endDate)) {
      calendar.push({
        week: new Array(7)
          .fill(null)
          .map(() => {
            const pure = addDays(currentDate, 1);
            const formatted = format(currentDate, 'dd', {locale: uk});
            const isToday = isSameDay(todayDate, currentDate);
            const isDisabled = !isSameMonth(date, currentDate);

            currentDate = addDays(currentDate, 1);

            return {
              isToday,
              isDisabled,
              value: {pure, formatted},
              events: []
            };
          })
      });
    }
    this.calendar = calendar;
  }

  handleSelectDate(value: Date, isDisabled: boolean): void {
    if (isDisabled) {
      return;
    }

    if (this.editEnabled) {
      this.dateSelected.emit(value);
      return;
    }

    const date = format(value, 'dd/MM/yyyy');

    const {id} = JSON.parse(localStorage.getItem('churchInfo') as string);

    this.router.navigate(['', 'schedule', id, date]);
  }
}
