import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../../../shared/services/API/auth.service';
import {SnackbarService} from '../../../../../shared/services/local/snackbar.service';
import {IChurch} from '../../../../../shared/interfaces/church.interfaces';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  isOpened = false;

  churchInfo!:Partial<IChurch>;

  constructor(
    private snackbarService: SnackbarService,
    private authService: AuthService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.churchInfo = JSON.parse(localStorage.getItem('churchInfo') as string);
  }

  exitFromAdminPanel(): void {
    this.authService.logout();

    const path = this.churchInfo
      ? ['', 'overview', this.churchInfo.id]
      : ['', 'church-selection'];

    this.router.navigate(path)
      .then(() => this.snackbarService.success('Вихід успішно виконано'))
  }
}
