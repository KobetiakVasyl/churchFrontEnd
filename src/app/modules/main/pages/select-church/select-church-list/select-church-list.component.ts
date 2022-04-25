import {Component, OnInit} from '@angular/core';
import {SelectChurchService} from "../../../shared/services/select-church.service";
import {ChurchService} from "../../../../../shared/services/API/church.service";
import {
  catchError,
  combineLatest,
  debounceTime,
  iif, map, Observable,
  scan,
  switchMap,
  tap,
  throwError
} from "rxjs";
import {ErrorMessageService} from "../../../../../shared/services/local/error-message.service";
import {IChurchListItem} from "../../../../../shared/interfaces/church.interfaces";
import {ScrollPaginationService} from "../../../../../shared/services/local/scroll-pagination.service";

@Component({
  selector: 'app-select-church-list',
  templateUrl: './select-church-list.component.html',
  styleUrls: ['./select-church-list.component.scss'],
  providers: [ErrorMessageService, ScrollPaginationService]
})
export class SelectChurchListComponent implements OnInit {
  churches$!: Observable<IChurchListItem[]>;

  constructor(
    private readonly selectChurchService: SelectChurchService,
    public readonly errorMessageService: ErrorMessageService,
    public readonly scrollPaginationService: ScrollPaginationService,
    private readonly churchService: ChurchService
  ) {
  }

  ngOnInit(): void {
    this.churches$ = combineLatest([
      this.scrollPaginationService.pagingInfo$,
      this.selectChurchService.filter$
    ])
      .pipe(
        tap(() => {
          this.errorMessageService.hideErrorMessage();
          this.scrollPaginationService.changeScrollTriggerState(true);
        }),
        debounceTime(500),
        switchMap(([pagingInfo, filterValue]) => {
          return iif<IChurchListItem[], IChurchListItem[]>(
            () => !!filterValue,
            this.churchService.search(filterValue),
            this.churchService.getByParams(pagingInfo.offset, pagingInfo.limit)
              .pipe(
                scan((acc, value) => {
                  acc.records.concat(value.records);
                  return acc;
                }),
                tap(value => this.scrollPaginationService.changeScrollTriggerState(value.totalCount === value.records.length)),
                map(({records}) => records)
              )
          );
        }),
        catchError(error => {
          this.errorMessageService.errorMessage = error.message;
          this.errorMessageService.showErrorMessage();

          return throwError(error);
        })
      )
  }
}
