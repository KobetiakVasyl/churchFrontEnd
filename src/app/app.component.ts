import {Component, OnDestroy} from '@angular/core';
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {filter, map, Subscription} from "rxjs";
import {LayoutBreakpointsService} from "./shared/services/local/layout-breakpoints.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  private readonly subscriptions = new Subscription();

  constructor(
    layoutBreakpointsService: LayoutBreakpointsService,
    breakpointObserver: BreakpointObserver
  ) {
    const breakpoints = [
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ];

    this.subscriptions.add(
      breakpointObserver
        .observe(breakpoints)
        .pipe(
          filter(({matches}) => matches),
          map(value => Object.values(value.breakpoints))
        )
        .subscribe(([XSmallValue, SmallValue, MediumValue, LargeValue, XLargeValue]) => {
          layoutBreakpointsService.changeExtraSmallMatch(XSmallValue);
          layoutBreakpointsService.changeSmallMatch(SmallValue);
          layoutBreakpointsService.changeMMediumMatch(MediumValue);
          layoutBreakpointsService.changeLargeMatch(LargeValue);
          layoutBreakpointsService.changeXExtraLargeMatch(XLargeValue);
        })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
