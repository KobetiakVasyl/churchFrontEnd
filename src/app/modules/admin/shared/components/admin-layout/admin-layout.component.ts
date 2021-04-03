import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../../auth/shared/services/auth.service";
import {SnackbarService} from "../../../../../shared/services/snackbar.service";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {
  isOpened = false;

  constructor(
    private snackbarService: SnackbarService,
    private authService: AuthService,
    private router: Router,
  ) {
  }

  exitFromAdminPanel(): void {
    this.authService.logout();

    const {id} = JSON.parse(<string>localStorage.getItem('churchInfo'));

    this.router.navigate(['', 'overview', id]);

    this.snackbarService.success('Вихід успішно виконано');
  }
}
