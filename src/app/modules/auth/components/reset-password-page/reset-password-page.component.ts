import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SnackbarService} from "../../../../shared/services/snackbar.service";
import {AuthService} from "../../shared/services/auth.service";
import {finalize} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.scss']
})
export class ResetPasswordPageComponent implements OnInit {
  private userInfo = {
    id: 0,
    token: ''
  };

  formGroup = new FormGroup({
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20)
    ]),
    passwordForComparison: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20)
    ])
  });

  constructor(
    private snackbarService: SnackbarService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params.userId && params.token) {
        this.userInfo.id = +params.userId;
        this.userInfo.token = params.token;
      }
    });
  }

  get password(): FormControl {
    return this.formGroup.get('password') as FormControl;
  }

  get passwordForComparison(): FormControl {
    return this.formGroup.get('passwordForComparison') as FormControl;
  }

  submit(): void {
    if (this.formGroup.invalid) return;

    const body = {
      userId: this.userInfo.id,
      ...this.formGroup.value
    };

    const snackbarRef = this.snackbarService.info('Триває оновлення нового паролю...', false)

    localStorage.setItem('token', this.userInfo.token);

    this.authService.resetPassword(body.userId, body)
      .pipe(finalize(() => {
        localStorage.removeItem('token');
        snackbarRef.close()
      }))
      .subscribe(() => {
        this.snackbarService.success('Пароль було успішно оновлено');
        this.router.navigate(['', 'auth', 'login']);
      });
  }

  isPasswordsMismatched(): boolean {
    if (this.formGroup.pristine || this.formGroup.invalid) return false;

    return this.password.value !== this.passwordForComparison.value;
  }
}
