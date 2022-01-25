import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {CalendarEvent} from '../../../../shared/interfaces/shared.interfaces';
import {EditSchedulePageService} from '../../shared/services/edit-schedule-page.service';

@Component({
  selector: 'app-edit-schedule-page',
  templateUrl: './edit-schedule-page.component.html',
  styleUrls: ['./edit-schedule-page.component.scss'],
})
export class EditSchedulePageComponent implements OnInit, OnDestroy {
  events: CalendarEvent[] = [
    {
      date: '08:00',
      text: 'lorem ipsum',
      type: '',
    },
    {
      date: '12:00',
      text: 'lorem ipsum dolor amet',
      type: '',
    },
    {
      date: '18:00',
      text: 'lorem ipsumlorem ipsum lorem ipsumlorem ipsumlorem ipsum lorem ipsum',
      type: '',
    }
  ];

  dateFormControl = new FormControl(new Date());

  constructor(
    public editSchedulePageService: EditSchedulePageService
  ) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  removeEvent(event: CalendarEvent): void {

  }
}
