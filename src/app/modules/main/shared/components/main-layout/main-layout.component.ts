import {Component} from '@angular/core';
import {Router} from "@angular/router";

import {AuthService} from "../../../../auth/shared/services/auth.service";

@Component({
  selector: 'main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {
  isOpened = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
  }

  navigateToAdminPanel(): void {
    this.authService.isAuthorized()
      ? this.router.navigate(['', 'admin', 'overview'])
      : this.router.navigate(['', 'auth', 'login']);
  }
}
