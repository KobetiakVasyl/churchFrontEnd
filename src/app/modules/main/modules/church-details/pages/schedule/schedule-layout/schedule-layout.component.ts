import { Component, OnInit } from '@angular/core';
import {MainTransferDataService} from "../../../../../shared/services/main-transfer-data.service";

@Component({
  selector: 'app-schedule-layout',
  templateUrl: './schedule-layout.component.html',
  styleUrls: ['./schedule-layout.component.scss']
})
export class ScheduleLayoutComponent implements OnInit {

  constructor(
    private readonly mainTransferDataService: MainTransferDataService,
  ) { }

  ngOnInit(): void {
    this.mainTransferDataService.changeToolbarTitle('Church details: Schedule');
  }

}
