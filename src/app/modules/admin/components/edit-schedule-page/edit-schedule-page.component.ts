import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {CalendarEvent} from '../../../main/modules/schedule/shared/interfaces';
import {EditSchedulePageService} from '../../shared/services/edit-schedule-page.service';

@Component({
  selector: 'app-edit-schedule-page',
  templateUrl: './edit-schedule-page.component.html',
  styleUrls: ['./edit-schedule-page.component.scss']
})
export class EditSchedulePageComponent {
  dateControl = new FormControl(new Date());
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

  constructor(
    public editSchedulePageService: EditSchedulePageService
  ) {
  }

  addEvent(): void {
    this.editSchedulePageService.handleAddEvent().subscribe(response => {

    });
  }

  removeEvent(event: CalendarEvent): void {

  }
}
