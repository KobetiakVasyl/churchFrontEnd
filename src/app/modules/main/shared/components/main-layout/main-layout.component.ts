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

  isAuthorized(): boolean {
    return TokenService.isAuthorized();
  }

  navigate(sidenav: MatSidenav, path: string): void {
    const {id} = JSON.parse(localStorage.getItem('churchInfo') as string);

    this.router.navigate(['', path, id]);

    sidenav.close();
  }

  navigateToAdminPanel(): void {
    if (!this.isAuthorized()) return;

    const path = ['', 'admin'];

    if (this.isChurchSelected()) {
      const {id} = JSON.parse(localStorage.getItem('churchInfo') as string);
      path.push('overview', id);
    } else {
      path.push('church', 'create');
    }

    this.router.navigate(path);
  }
}
