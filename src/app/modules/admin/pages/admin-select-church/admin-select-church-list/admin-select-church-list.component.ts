import {Component, OnInit} from '@angular/core';
import {
  catchError,
  combineLatest,
  debounceTime,
  delay,
  iif,
  map,
  Observable,
  scan,
  switchMap,
  tap,
  throwError
} from "rxjs";
import {HttpLoadingService} from "../../../../../shared/services/local/http-loading.service";
import {ChurchService} from "../../../../../shared/services/API/church.service";
import {IChurch, IChurchListItem} from "../../../../../shared/interfaces/church.interfaces";
import {ErrorMessageService} from "../../../../../shared/services/local/error-message.service";
import {ScrollPaginationService} from "../../../../../shared/services/local/scroll-pagination.service";
import {AdminSelectChurchService} from "../../../shared/services/admin-select-church.service";

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
        switchMap(([pagingInfo, filterValue]) => this.churchService.getByParams(pagingInfo.offset, pagingInfo.limit)
          .pipe(
            scan((acc, value) => {
              acc.records.concat(value.records);
              return acc;
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
