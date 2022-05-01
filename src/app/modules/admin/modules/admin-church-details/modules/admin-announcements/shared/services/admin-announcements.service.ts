import {Injectable} from '@angular/core';
import {startWith, Subject} from "rxjs";
import {MatDialog} from "@angular/material/dialog";

@Injectable({providedIn: 'root'})
export class AdminAnnouncementsService {
  private readonly reloadSource = new Subject<void>();

  readonly reload$ = this.reloadSource.asObservable()
    .pipe(startWith(null));

  constructor(private readonly matDialog: MatDialog) {
  }

  reloadAnnouncements(): void {
    this.reloadSource.next();
  }
}
