import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../../../shared/services/API/auth.service';
import {SnackbarService} from '../../../../../shared/services/local/snackbar.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  isOpened = false;
  churchExists = false;

  constructor(
    private snackbarService: SnackbarService,
    private authService: AuthService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.churchExists = !!JSON.parse(localStorage.getItem('churchInfo') as string)?.id;
  }

  exitFromAdminPanel(): void {
    this.authService.logout();

    const {id} = JSON.parse(localStorage.getItem('churchInfo') as string);

    this.router.navigate(['', 'overview', id]);

    this.snackbarService.success('Вихід успішно виконано');
  }
}
