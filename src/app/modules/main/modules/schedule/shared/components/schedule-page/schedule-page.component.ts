import {Component, EventEmitter, Output} from '@angular/core';
import {fadeInAnimation} from '../../../../../../../shared/animations';

@Component({
  selector: 'app-schedule-page',
  templateUrl: './schedule-page.component.html',
  styleUrls: ['./schedule-page.component.scss'],
  animations: [fadeInAnimation]
})
export class SchedulePageComponent {
  @Output() dateSelect = new EventEmitter<Date>();

  handleDateSelect(event: Date): void {
    this.dateSelect.emit(event);
  }
}
