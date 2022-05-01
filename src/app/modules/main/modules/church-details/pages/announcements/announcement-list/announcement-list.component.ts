import {Component, OnInit} from '@angular/core';
import {ErrorMessageService} from "../../../../../../../shared/services/local/error-message.service";
import {AnnouncementService} from "../../../../../../../shared/services/API/announcement.service";
import {AnnouncementTransferDataService} from "../../../shared/services/announcement-transfer-data.service";
import {
  catchError,
  combineLatest,
  debounceTime,
  finalize, iif,
  map,
  Observable, of, pairwise, reduce,
  scan, startWith,
  switchMap, take,
  tap,
  throwError, withLatestFrom
} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {HttpLoadingService} from "../../../../../../../shared/services/local/http-loading.service";
import {IAnnouncement, IAnnouncementPartialList} from "../../../../../../../shared/interfaces/announcement.interfaces";
import {ScrollPaginationService} from "../../../../../../../shared/services/local/scroll-pagination.service";

@Component({
  selector: 'app-announcement-list',
  templateUrl: './announcement-list.component.html',
  styleUrls: ['./announcement-list.component.scss'],
  providers: [ErrorMessageService, ScrollPaginationService]
})
export class AnnouncementListComponent implements OnInit {
  announcements$!: Observable<IAnnouncement[]>;

  constructor(
    public readonly errorMessageService: ErrorMessageService,
    public readonly scrollPaginationService: ScrollPaginationService,
    private readonly announcementService: AnnouncementService,
    private readonly announcementTransferDataService: AnnouncementTransferDataService,
    private readonly route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.announcements$ = combineLatest([
      this.scrollPaginationService.pagingInfo$,
      this.announcementTransferDataService.dateRange$,
      (this.route.parent as ActivatedRoute).params
    ]).pipe(
      tap(() => {
        this.errorMessageService.hideErrorMessage();
        this.scrollPaginationService.changeScrollTriggerState(true);
      }),
      debounceTime(500),
      switchMap(([pagingInfo, dateRange, routerParams]) => this.announcementService
        .getByParams(
          dateRange.from,
          dateRange.to,
          routerParams['id'],
          pagingInfo.offset,
          pagingInfo.limit
        )
      ),
      startWith({
        totalCount: 0,
        records: []
      } as IAnnouncementPartialList),
      pairwise(),
      map(([prev, curr]) => {
        curr.records = prev.records.concat(curr.records);
        return curr;
      }),
      tap(value => this.scrollPaginationService.changeScrollTriggerState(value.totalCount === value.records.length)),
      map(({records}) => records),
      catchError(error => {
        this.errorMessageService.errorMessage = error.message;
        this.errorMessageService.showErrorMessage();

        return throwError(error);
      })
    );
  }

  get showLoading(): Observable<boolean> {
    return HttpLoadingService.showLoading$
  }
}
