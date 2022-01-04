import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {SnackbarService} from '../../../../shared/services/local/snackbar.service';
import {AuthService} from '../../../../shared/services/API/auth.service';

import {bounceInDownAnimation, fadeInAnimation} from '../../../../shared/animations';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss'],
  animations: [bounceInDownAnimation, fadeInAnimation]
})
export class SignInPageComponent implements OnInit {
  shouldShowForm = false;

  formGroup: FormGroup = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20)
    ])
  });

  constructor(
    private snackbarService: SnackbarService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params?.isEmailVerified) {
        this.snackbarService
          .info('Емеіл підтверджено. Запит на реєстрацію прийнятий. Будь ласка зачекайте доки з вами зв\'яжуться адміністратори сайту');
      }
    });

    setTimeout(() => this.shouldShowForm = true, 200);
  }

  get password(): FormControl {
    return this.formGroup.get('password') as FormControl;
  }

  submit(): void {
    if (this.formGroup.invalid) {
      return;
    }

    const snackbarRef = this.snackbarService.info('Триває вхід...', false);

    this.authService.signIn(this.formGroup.value)
      .pipe(finalize(() => snackbarRef.close()))
      .subscribe(response => {
        localStorage.setItem('token', response.token);

        this.snackbarService.success('Вхід успішно виконано!');

        const churchInfo = JSON.parse(localStorage.getItem('churchInfo') as string);

        const path = !!churchInfo
          ? ['', 'admin', 'overview', churchInfo.id]
          : ['', 'admin', 'church', 'create'];


        this.router.navigate(path);
      });
  }
}
