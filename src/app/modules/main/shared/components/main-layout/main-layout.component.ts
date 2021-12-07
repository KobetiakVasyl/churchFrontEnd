import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {MatSidenav} from '@angular/material/sidenav';

import {TokenService} from '../../../../../shared/services/local/token.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {
  isOpened = false;

  constructor(private router: Router) {
  }

  isChurchSelected(): boolean {
    return !!JSON.parse(localStorage.getItem('churchInfo') as string);
  }

  navigateToAdminPanel(sidenav: MatSidenav): void {
    TokenService.isAuthorized()
      ? this.router.navigate(['', 'admin', 'overview'])
      : this.router.navigate(['', 'auth', 'login']);

    sidenav.close();
  }

  navigate(sidenav: MatSidenav, path: string): void {
    const {id} = JSON.parse(localStorage.getItem('churchInfo') as string);

    this.router.navigate(['', path, id]);

    sidenav.close();
  }
}
