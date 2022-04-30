import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {LayoutBreakpointsService} from "../../../../../../../shared/services/local/layout-breakpoints.service";
import {AdminTransferDataService} from "../../../../../shared/services/admin-transfer-data.service";

@Component({
  selector: 'app-admin-church-details-layout',
  templateUrl: './admin-church-details-layout.component.html',
  styleUrls: ['./admin-church-details-layout.component.scss']
})
export class AdminChurchDetailsLayoutComponent implements OnInit {
  readonly routes = [
    {
      iconName: 'description',
      pathSegment: 'overview',
      label: 'Загальне'
    },
    {
      iconName: 'calendar_today',
      pathSegment: 'schedule',
      label: 'Розклад'
    },
    {
      iconName: 'announcement',
      pathSegment: 'announcements',
      label: 'Оголошення'
    }
  ];

  @ViewChild('templateBottomSheet') templateBottomSheet!: TemplateRef<any>;

  constructor(
    public readonly route: ActivatedRoute,
    private readonly matBottomSheet: MatBottomSheet,
    public readonly layoutBreakpointsService: LayoutBreakpointsService,
    public readonly adminTransferDataService: AdminTransferDataService,
  ) {
  }

  ngOnInit(): void {
    this.adminTransferDataService.changeToolbarTitle('admin: church details')
  }

  openNavigation(): void {
    this.matBottomSheet.open(this.templateBottomSheet);
  }

  closeNavigation() {
    this.matBottomSheet.dismiss();
  }
}
