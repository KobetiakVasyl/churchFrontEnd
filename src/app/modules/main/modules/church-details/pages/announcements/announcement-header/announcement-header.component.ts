import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {debounceTime, distinctUntilChanged, EMPTY, merge, mergeMap, Observable, Subscription, tap, timer} from "rxjs";
import {HttpLoadingService} from "../../../../../../../shared/services/local/http-loading.service";
import {AnnouncementTransferDataService} from "../../../shared/services/announcement-transfer-data.service";
import {isToday} from "date-fns";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'app-announcement-header',
  templateUrl: './announcement-header.component.html',
  styleUrls: ['./announcement-header.component.scss']
})
export class AnnouncementHeaderComponent implements OnInit, OnDestroy {
  readonly filterFormControl = new FormControl(null);
  readonly dateRangeFormGroup = new FormGroup({
    from: new FormControl(''),
    to: new FormControl(new Date()),
  });

  private readonly subscriptions = new Subscription();

  @ViewChild('tooltip') private readonly tooltip!: MatTooltip;

  constructor(private readonly announcementTransferDataService: AnnouncementTransferDataService) {
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.filterFormControl.valueChanges
        .pipe(
          debounceTime(500),
          distinctUntilChanged()
        )
        .subscribe(value => this.announcementTransferDataService.changeFilter(value))
    );

    this.subscriptions.add(
      this.dateRangeFormGroup.valueChanges
        .pipe(
          debounceTime(500),
          distinctUntilChanged()
        )
        .subscribe(value => this.announcementTransferDataService.changeDateRange(value))
    );

    merge(timer(0), timer(3000))
      .subscribe(() => this.tooltip.toggle());
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  get showLoading(): Observable<boolean> {
    return HttpLoadingService.showLoading$;
  }

  isTodayDate(value: Date): boolean {
    return isToday(value);
  }
}
