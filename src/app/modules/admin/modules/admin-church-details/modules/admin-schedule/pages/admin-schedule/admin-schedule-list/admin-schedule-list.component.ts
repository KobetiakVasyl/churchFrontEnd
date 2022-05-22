import { Component, OnInit } from '@angular/core';
import {
  catchError,
  combineLatest,
  debounceTime,
  map,
  Observable,
  pairwise,
  startWith,
  switchMap,
  tap,
  throwError
} from "rxjs";
import {ErrorMessageService} from "../../../../../../../../../shared/services/local/error-message.service";
import {ScrollPaginationService} from "../../../../../../../../../shared/services/local/scroll-pagination.service";
import {ActivatedRoute} from "@angular/router";
import {HttpLoadingService} from "../../../../../../../../../shared/services/local/http-loading.service";
import {
  IScheduleEvent,
  TScheduleEventPartialList
} from "../../../../../../../../../shared/interfaces/schedule-event.interfaces";
import {ScheduleEventService} from "../../../../../../../../../shared/services/API/schedule-event.service";
import {AdminScheduleBrokerService} from "../../../shared/services/admin-schedule-broker.service";

@Component({
  selector: 'app-admin-schedule-list',
  templateUrl: './admin-schedule-list.component.html',
  styleUrls: ['./admin-schedule-list.component.scss'],
  providers: [ErrorMessageService, ScrollPaginationService]
})
export class AdminScheduleListComponent implements OnInit {
  events$!: Observable<IScheduleEvent[]>;

  constructor(
    public readonly errorMessageService: ErrorMessageService,
    public readonly scrollPaginationService: ScrollPaginationService,
    private readonly adminScheduleBrokerService: AdminScheduleBrokerService,
    private readonly scheduleEventService: ScheduleEventService,
    private readonly activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.events$ = combineLatest([
      this.scrollPaginationService.pagingInfo$,
      this.adminScheduleBrokerService.date$,
      (this.activatedRoute?.parent?.parent?.parent as ActivatedRoute).params
    ]).pipe(
      tap(() => {
        this.errorMessageService.hideErrorMessage();
        this.scrollPaginationService.changeScrollTriggerState(true);
      }),
      debounceTime(500),
      switchMap(([pagingInfo, date, routerParams]) => this.scheduleEventService
        .getByParams(
          routerParams['id'],
          date,
          pagingInfo.offset,
          pagingInfo.limit
        )
      ),
      // TODO: update when response from server will be available
      // startWith({
      //   totalCount: 0,
      //   records: []
      // } as TScheduleEventPartialList),
      // pairwise(),
      // map(([prev, curr]) => {
      //   curr.records = prev.records.concat(curr.records);
      //   return curr;
      // }),
      // tap(value => this.scrollPaginationService.changeScrollTriggerState(value.totalCount === value.records.length)),
      // map(({records}) => records),
      catchError(error => {
        this.errorMessageService.errorMessage = error.message;
        this.errorMessageService.showErrorMessage();

        return throwError(error);
      })
    );
  }

  get showLoading$(): Observable<boolean> {
    return HttpLoadingService.showLoading$;
  }
}
