import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EditSchedulePageService} from '../../shared/services/edit-schedule-page.service';

@Component({
  selector: 'app-create-schedule-event-page',
  templateUrl: './create-schedule-event-page.component.html',
  styleUrls: ['./create-schedule-event-page.component.scss']
})
export class CreateScheduleEventPageComponent implements OnInit {
  dateSelectFormGroup = new FormGroup({
    date: new FormControl(null, Validators.required)
  });

  timeFormGroup = new FormGroup({
    hours: new FormControl(12, Validators.required),
    minutes: new FormControl(0, Validators.required)
  });

  constructor(
    public editSchedulePageService: EditSchedulePageService
  ) {
  }

  ngOnInit(): void {

  }

  changeHours(direction: number): void {
    let hours = this.timeFormGroup.value.hours + direction;

    if (hours > 24) {
      hours = 0;
    }

    if (hours < 0) {
      hours = 24;
    }

    this.timeFormGroup.patchValue({hours});
  }

  changeMinutes(direction: number): void {
    let minutes = this.timeFormGroup.value.minutes + direction;

    if (minutes > 55) {
      minutes = 0;
    }

    if (minutes < 0) {
      minutes = 55;
    }

    this.timeFormGroup.patchValue({minutes});
  }

  handleDateSelect(date: Date): void {
    this.dateSelectFormGroup.patchValue({date});
  }

  submit(): void {

  }
}
