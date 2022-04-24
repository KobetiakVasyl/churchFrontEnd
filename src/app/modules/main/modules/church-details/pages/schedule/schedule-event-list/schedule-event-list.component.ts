import {Component, OnInit} from '@angular/core';
import {Observable, switchMap, withLatestFrom} from "rxjs";
import {IScheduleEvent} from "../../../../../../../shared/interfaces/schedule-event.interfaces";
import {ScheduleEventService} from "../../../../../../../shared/services/API/schedule-event.service";
import {ScheduleService} from "../../../shared/services/schedule.service";
import {ErrorMessageService} from "../../../../../../../shared/services/local/error-message.service";
import {ActivatedRoute} from "@angular/router";
import {HttpLoadingService} from "../../../../../../../shared/services/local/http-loading.service";

@Component({
  selector: 'app-schedule-event-list',
  templateUrl: './schedule-event-list.component.html',
  styleUrls: ['./schedule-event-list.component.scss'],
  providers: [ErrorMessageService]
})
export class ScheduleEventListComponent implements OnInit {
  events$!: Observable<IScheduleEvent[]>;

  constructor(
    private readonly scheduleEventService: ScheduleEventService,
    public readonly scheduleService: ScheduleService,
    public readonly errorMessageService: ErrorMessageService,
    private readonly route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.events$ = this.scheduleService.eventDate$.pipe(
      withLatestFrom((this.route.parent as ActivatedRoute).params),
      switchMap(([date, params]) => this.scheduleEventService.getByParams(params['id'], date, 0, 10))
    );
  }

  get showLoading(): Observable<boolean> {
    return HttpLoadingService.showLoading$
  }
}
