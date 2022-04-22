import {Component, OnInit} from '@angular/core';
import {ErrorMessageService} from "../../../../../../../shared/services/local/error-message.service";
import {AnnouncementService} from "../../../../../../../shared/services/API/announcement.service";
import {AnnouncementTransferDataService} from "../../../shared/services/announcement-transfer-data.service";
import {combineLatest, map, Observable, switchMap, withLatestFrom, zip} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {HttpLoadingService} from "../../../../../../../shared/services/local/http-loading.service";
import {IAnnouncement} from "../../../../../../../shared/interfaces/announcement.interfaces";

@Component({
  selector: 'app-announcement-list',
  templateUrl: './announcement-list.component.html',
  styleUrls: ['./announcement-list.component.scss'],
  providers: [ErrorMessageService]
})
export class AnnouncementListComponent implements OnInit {
  announcements$!: Observable<IAnnouncement[]>;
  noEventsPlanned$!: Observable<boolean>;

  constructor(
    public readonly errorMessageService: ErrorMessageService,
    private readonly announcementService: AnnouncementService,
    private readonly announcementTransferDataService: AnnouncementTransferDataService,
    private readonly route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.announcements$ = combineLatest([this.announcementTransferDataService.filter$, this.announcementTransferDataService.dateRange$]).pipe(
      withLatestFrom((this.route.parent as ActivatedRoute).params),
      switchMap(([[filter, {from, to}], params]) => this.announcementService.getByParams(from, to, params['id'], 0, 10)),
      map(value=> [...value,...value,...value,...value,...value,...value,...value,...value,...value])
    )

    this.noEventsPlanned$ = HttpLoadingService.showLoading$
      .pipe(
        withLatestFrom(this.announcements$),
        map(([loading, list]) => !loading && !list.length),
      );
  }

  get showLoading(): Observable<boolean> {
    return HttpLoadingService.showLoading$
  }
}
