import {Component, OnInit} from '@angular/core';
import {AdminTransferDataService} from "../../../shared/services/admin-transfer-data.service";

@Component({
  selector: 'app-admin-select-church-layout',
  templateUrl: './admin-select-church-layout.component.html',
  styleUrls: ['./admin-select-church-layout.component.scss']
})
export class AdminSelectChurchLayoutComponent implements OnInit {
  constructor(private readonly adminTransferDataService: AdminTransferDataService) {
  }

  ngOnInit(): void {
    this.adminTransferDataService.changeToolbarTitle('admin: select church')
  }
}
