import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {IPagingInfo} from "../../interfaces/pagination.interfaces";

@Injectable()
export class ScrollPaginationService {
  readonly disableScrollTrigger = new BehaviorSubject(false);
  readonly pagingInfo$ = new BehaviorSubject<IPagingInfo>({limit: 10, offset: 0});

  changeScrollTriggerState(value: boolean): void {
    this.disableScrollTrigger.next(value);
  }

  loadNextPage() {
    const value = {...this.pagingInfo$.value};
    value.offset += value.limit;
    this.pagingInfo$.next(value);
  }
}
