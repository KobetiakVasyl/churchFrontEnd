import {Component, OnInit} from '@angular/core';
import {MainTransferDataService} from "../../../../../shared/services/main-transfer-data.service";

@Component({
  selector: 'app-announcements-layout',
  templateUrl: './announcements-layout.component.html',
  styleUrls: ['./announcements-layout.component.scss']
})
export class AnnouncementsLayoutComponent implements OnInit {
  constructor(private readonly mainTransferDataService: MainTransferDataService) {
  }

  ngOnInit(): void {
    this.mainTransferDataService.changeToolbarTitle('Church details: Announcements')
  }

}
