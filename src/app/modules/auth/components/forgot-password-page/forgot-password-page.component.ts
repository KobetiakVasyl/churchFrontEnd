import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import {finalize} from 'rxjs/operators';

import {SnackbarService} from '../../../../shared/services/local/snackbar.service';
import {AuthService} from '../../../../shared/services/API/auth.service';

@Component({
  selector: 'app-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  styleUrls: ['./forgot-password-page.component.scss']
})
export class ForgotPasswordPageComponent {
  emailControl = new FormControl(null, [
    Validators.required,
    Validators.email
  ]);

  constructor(
    private snackbarService: SnackbarService,
    private authService: AuthService,
    private router: Router
  ) {
  }

  submit(): void {
    if (this.emailControl.invalid) return;

    const snackbarRef = this.snackbarService.info('Надсилання запиту на відновлення паролю...', false);

    const body = {
      email: this.emailControl.value
    };

    this.authService.sendEmailToResetPassword(body)
      .pipe(finalize(() => snackbarRef.close()))
      .subscribe(() => {
        this.snackbarService.success('Запит надіслано. Будь ласка перевірте пошту на наявність листа з подальшими вказівками.');
        this.router.navigate(['', 'church-selection']);
      });
  }

}
