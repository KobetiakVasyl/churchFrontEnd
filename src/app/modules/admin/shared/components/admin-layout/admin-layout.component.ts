import {Component} from '@angular/core';
import {AdminTransferDataService} from "../../services/admin-transfer-data.service";
import {AuthService} from "../../../../../shared/services/API/auth.service";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {

  constructor(public readonly adminTransferDataService: AdminTransferDataService) {
  }

  signOut() {
    AuthService.signOut();
  }
}
