import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {MatSidenav} from "@angular/material/sidenav";

import {AuthService} from "../../../../auth/shared/services/auth.service";

@Component({
  selector: 'app-main-layout',
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

  isChurchSelected(): boolean {
    return !!JSON.parse(<string>localStorage.getItem('churchInfo'));
  }

  navigateToAdminPanel(sidenav: MatSidenav): void {
    this.authService.isAuthorized()
      ? this.router.navigate(['', 'admin', 'overview'])
      : this.router.navigate(['', 'auth', 'login']);

    sidenav.close();
  }

  navigate(sidenav: MatSidenav, path: string): void {
    const {id} = JSON.parse(<string>localStorage.getItem('churchInfo'));

    this.router.navigate(['', path, id]);

    sidenav.close();
  }
}
