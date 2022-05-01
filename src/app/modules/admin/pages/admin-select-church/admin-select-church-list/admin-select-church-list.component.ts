import {Component, OnInit} from '@angular/core';
import {
  catchError,
  combineLatest,
  debounceTime,
  map,
  Observable, pairwise,
  scan, startWith,
  switchMap,
  tap,
  throwError
} from "rxjs";
import {HttpLoadingService} from "../../../../../shared/services/local/http-loading.service";
import {ChurchService} from "../../../../../shared/services/API/church.service";
import {IChurch, IChurchPartialList} from "../../../../../shared/interfaces/church.interfaces";
import {ErrorMessageService} from "../../../../../shared/services/local/error-message.service";
import {ScrollPaginationService} from "../../../../../shared/services/local/scroll-pagination.service";
import {AdminSelectChurchService} from "../../../shared/services/admin-select-church.service";
import {IAnnouncementPartialList} from "../../../../../shared/interfaces/announcement.interfaces";

@Component({
  selector: 'app-admin-select-church-list',
  templateUrl: './admin-select-church-list.component.html',
  styleUrls: ['./admin-select-church-list.component.scss'],
  providers: [ErrorMessageService, ScrollPaginationService]
})
export class AdminSelectChurchListComponent implements OnInit {
  churches$!: Observable<IChurch[]>;

  constructor(
    private readonly churchService: ChurchService,
    public readonly errorMessageService: ErrorMessageService,
    public readonly scrollPaginationService: ScrollPaginationService,
    private readonly adminSelectChurchService: AdminSelectChurchService
  ) {
  }

  ngOnInit(): void {
    this.churches$ = combineLatest([
      this.scrollPaginationService.pagingInfo$,
      this.adminSelectChurchService.filter$
    ])
      .pipe(
        tap(() => {
          this.errorMessageService.hideErrorMessage();
          this.scrollPaginationService.changeScrollTriggerState(true);
        }),
        debounceTime(500),
        switchMap(([pagingInfo, filterValue]) => this.churchService.getForAuthorizedByParams(pagingInfo.offset, pagingInfo.limit)
          .pipe(
            startWith({
              totalCount: 0,
              records: []
            } as IChurchPartialList),
            pairwise(),
            map(([prev, curr]) => {
              curr.records = prev.records.concat(curr.records);
              return curr;
            }),
            tap(value => this.scrollPaginationService.changeScrollTriggerState(value.totalCount === value.records.length)),
            map(({records}) => records)
          )),
        catchError(error => {
          this.errorMessageService.errorMessage = error.message;
          this.errorMessageService.showErrorMessage();

          return throwError(error);
        })
      )
  }

  get showLoading$(): Observable<boolean> {
    return HttpLoadingService.showLoading$;
  }
}
