import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatSidenav} from '@angular/material/sidenav';

import {TokenService} from '../../../../../shared/services/local/token.service';
import {IChurch} from '../../../../../shared/interfaces/church.interfaces';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  isOpened = false;

  churchInfo!: Partial<IChurch>;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.churchInfo = JSON.parse(localStorage.getItem('churchInfo') as string);
  }

  isChurchSelected(): boolean {
    return !!this.churchInfo;
  }

  navigate(sidenav: MatSidenav, path: string): void {
    const {id} = JSON.parse(localStorage.getItem('churchInfo') as string);

    this.router.navigate(['', path, id]);

    sidenav.close();
  }

  isAuthorized(): boolean {
    return TokenService.isAuthorized();
  }

  navigateToAdminPanel(): void {
    if (!this.isAuthorized()){
      return;
    }

    const path = !!this.churchInfo
      ? ['', 'admin', 'overview', this.churchInfo.id]
      : ['', 'admin', 'church', 'create'];

    this.router.navigate(path);
  }
}
