import {Component, Input} from '@angular/core';
import {IScheduleEvent} from "../../../../../../../../../shared/interfaces/schedule-event.interfaces";

@Component({
  selector: 'app-admin-schedule-list-item',
  templateUrl: './admin-schedule-list-item.component.html',
  styleUrls: ['./admin-schedule-list-item.component.scss']
})
export class AdminScheduleListItemComponent {
  @Input() scheduleEvent!: IScheduleEvent;
}
