import {Component, Input} from '@angular/core';
import {IScheduleEvent} from "../../../../../../../shared/interfaces/schedule-event.interfaces";

@Component({
  selector: 'app-schedule-event-list-item',
  templateUrl: './schedule-event-list-item.component.html',
  styleUrls: ['./schedule-event-list-item.component.scss']
})
export class ScheduleEventListItemComponent {
  @Input() scheduleEvent!: IScheduleEvent;
}
