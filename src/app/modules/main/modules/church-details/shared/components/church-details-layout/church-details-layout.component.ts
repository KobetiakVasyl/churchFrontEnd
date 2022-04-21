import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {LayoutBreakpointsService} from "../../../../../../../shared/services/local/layout-breakpoints.service";

@Component({
  selector: 'app-church-details-layout',
  templateUrl: './church-details-layout.component.html',
  styleUrls: ['./church-details-layout.component.scss']
})
export class ChurchDetailsLayoutComponent {
  readonly routes = [
    {
      iconName: 'description',
      pathSegment: 'overview'
    },
    {
      iconName: 'calendar_today',
      pathSegment: 'schedule'
    },
    {
      iconName: 'announcement',
      pathSegment: 'announcements'
    }
  ];

  constructor(
    public readonly layoutBreakpointsService: LayoutBreakpointsService,
    public readonly route: ActivatedRoute
  ) {
  }
}
