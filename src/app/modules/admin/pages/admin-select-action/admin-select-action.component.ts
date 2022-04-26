import { Component, OnInit } from '@angular/core';
import {AdminTransferDataService} from "../../shared/services/admin-transfer-data.service";

@Component({
  selector: 'app-admin-select-action',
  templateUrl: './admin-select-action.component.html',
  styleUrls: ['./admin-select-action.component.scss']
})
export class AdminSelectActionComponent implements OnInit {
  constructor(public readonly adminTransferDataService: AdminTransferDataService) {
  }

  ngOnInit(): void {
    this.adminTransferDataService.changeToolbarTitle('admin: select action');
  }
}
