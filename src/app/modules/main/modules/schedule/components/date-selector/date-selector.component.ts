import { Component, OnInit } from '@angular/core';
import {CalendarDateService} from '../../shared/services/calendar-date.service';

@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.scss']
})
export class DateSelectorComponent implements OnInit {

  constructor(public calendarDateService: CalendarDateService) { }

  ngOnInit(): void {
  }

  changeMonth(loadNext: boolean): void {
    this.calendarDateService.changeMonth(loadNext);
  }
}
