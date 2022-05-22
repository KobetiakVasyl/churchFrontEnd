import {Component, OnInit} from '@angular/core';
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
import {
  IAnnouncement,
  IAnnouncementPartialList
} from "../../../../../../../../../shared/interfaces/announcement.interfaces";
import {ErrorMessageService} from "../../../../../../../../../shared/services/local/error-message.service";
import {ScrollPaginationService} from "../../../../../../../../../shared/services/local/scroll-pagination.service";
import {AnnouncementService} from "../../../../../../../../../shared/services/API/announcement.service";
import {ActivatedRoute} from "@angular/router";
import {HttpLoadingService} from "../../../../../../../../../shared/services/local/http-loading.service";

@Component({
  selector: 'app-admin-announcements-list',
  templateUrl: './admin-announcements-list.component.html',
  styleUrls: ['./admin-announcements-list.component.scss'],
  providers: [ErrorMessageService, ScrollPaginationService]
})
export class AdminAnnouncementsListComponent implements OnInit {
  announcements$!: Observable<IAnnouncement[]>;

  constructor(
    public readonly errorMessageService: ErrorMessageService,
    public readonly scrollPaginationService: ScrollPaginationService,
    private readonly announcementService: AnnouncementService,
    private readonly activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.announcements$ = combineLatest([
      this.scrollPaginationService.pagingInfo$,
      (this.activatedRoute?.parent?.parent?.parent as ActivatedRoute).params
    ]).pipe(
      tap(() => {
        this.errorMessageService.hideErrorMessage();
        this.scrollPaginationService.changeScrollTriggerState(true);
      }),
      debounceTime(500),
      switchMap(([pagingInfo, routerParams]) => this.announcementService
        .getByParams(
          null,
          new Date(),
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

  get showLoading$(): Observable<boolean> {
    return HttpLoadingService.showLoading$;
  }
}
