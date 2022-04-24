import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {IAnnouncementDateRange} from "../../../../../../shared/interfaces/announcement.interfaces";

@Injectable({providedIn: 'root'})
export class AnnouncementTransferDataService {
  readonly dateRange$ =  new Subject<IAnnouncementDateRange>();
  readonly filter$ = new Subject<string>();

  changeFilter(value: string): void {
    this.filter$.next(value);
  }

  changeDateRange(value: IAnnouncementDateRange): void {
    this.dateRange$.next(value);
  }
}
