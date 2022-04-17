import {Component} from '@angular/core';
import {AuthTransferDataService} from "../../services/auth-transfer-data.service";

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['auth-layout.component.scss']
})
export class AuthLayoutComponent {
  constructor(readonly authTransferDataService: AuthTransferDataService) {
  }
}
