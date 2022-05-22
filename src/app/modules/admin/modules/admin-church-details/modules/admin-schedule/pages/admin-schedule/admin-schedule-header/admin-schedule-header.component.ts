import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AdminScheduleBrokerService} from "../../../shared/services/admin-schedule-broker.service";

@Component({
  selector: 'app-admin-schedule-header',
  templateUrl: './admin-schedule-header.component.html',
  styleUrls: ['./admin-schedule-header.component.scss']
})
export class AdminScheduleHeaderComponent {
  readonly todayDate = new Date();

  constructor(
    public readonly activatedRoute: ActivatedRoute,
    public readonly adminScheduleBrokerService: AdminScheduleBrokerService
  ) {
  }
}
