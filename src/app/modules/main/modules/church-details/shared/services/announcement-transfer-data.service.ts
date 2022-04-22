import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {IAnnouncementDateRange} from "../../../../../../shared/interfaces/announcement.interfaces";

@Injectable({providedIn: 'root'})
export class AnnouncementTransferDataService {
  readonly dateRange$ =  new BehaviorSubject<IAnnouncementDateRange>({
    from: null,
    to: new Date()
  });

  readonly filter$ = new BehaviorSubject<string | null>(null);

  changeFilter(value: string): void {
    this.filter$.next(value);
  }

  changeDateRange(value: IAnnouncementDateRange): void {
    this.dateRange$.next(value);
  }
}
