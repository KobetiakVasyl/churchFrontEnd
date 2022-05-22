import {Component} from '@angular/core';
import {MainTransferDataService} from "../../services/main-transfer-data.service";
import {TokenService} from "../../../../../shared/services/local/token.service";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {
  constructor(readonly mainTransferDataService: MainTransferDataService) {
  }

  get isAuthorized(): boolean {
    return TokenService.isAuthorized();
  }
}
