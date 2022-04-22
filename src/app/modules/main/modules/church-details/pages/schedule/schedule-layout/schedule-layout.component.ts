import { Component, OnInit } from '@angular/core';
import {MainTransferDataService} from "../../../../../shared/services/main-transfer-data.service";
import {map, Observable, zip} from "rxjs";
import {LayoutBreakpointsService} from "../../../../../../../shared/services/local/layout-breakpoints.service";

@Component({
  selector: 'app-schedule-layout',
  templateUrl: './schedule-layout.component.html',
  styleUrls: ['./schedule-layout.component.scss']
})
export class ScheduleLayoutComponent implements OnInit {
  scrollToTopButtonRightPosition$!: Observable<string>;

  constructor(
    private readonly layoutBreakpointsService: LayoutBreakpointsService,
    private readonly mainTransferDataService: MainTransferDataService,
  ) { }

  ngOnInit(): void {
    this.mainTransferDataService.changeToolbarTitle('Church details: Schedule');

    this.scrollToTopButtonRightPosition$ = zip(this.layoutBreakpointsService.extraSmallMatch$, this.layoutBreakpointsService.smallMatch$)
      .pipe(map(([extraSmall, small]) => extraSmall || small ? '6rem' : '1.5rem'));
  }

}
