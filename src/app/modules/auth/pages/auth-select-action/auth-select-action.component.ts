import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/shared/services/local/token.service';
import { AuthTransferDataService } from '../../shared/services/auth-transfer-data.service';

@Component({
  selector: 'app-auth-select-action',
  templateUrl: './auth-select-action.component.html',
  styleUrls: ['./auth-select-action.component.scss'],
})
export class AuthSelectActionComponent implements OnInit {
  constructor(readonly authTransferDataService: AuthTransferDataService) {}

  ngOnInit(): void {
    this.authTransferDataService.changeToolbarTitle('auth');
  }

  get isAuthorized(): boolean {
    return TokenService.isAuthorized();
  }
}
