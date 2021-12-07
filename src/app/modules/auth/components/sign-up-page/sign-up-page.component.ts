import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {fadeInAnimation} from '../../../../shared/animations';
import {SnackbarService} from '../../../../shared/services/local/snackbar.service';
import {finalize} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Role} from '../../../../shared/interfaces/roles.interfaces';
import {RolesService} from '../../../../shared/services/API/roles.service';
import {AuthService} from '../../../../shared/services/API/auth.service';
import {SignUpBody} from '../../../../shared/interfaces/auth.interfaces';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss'],
  animations: [fadeInAnimation]
})

export class SignUpPageComponent implements OnInit {
  formGroup = new FormGroup({
    firstName: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    phoneNumber: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[0-9]*$/),
      Validators.minLength(12),
      Validators.maxLength(12)
    ]),
    roleId: new FormControl(null, Validators.required),
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

  roles$!: Observable<Role[]>;

  constructor(
    private readonly snackbarService: SnackbarService,
    private readonly authService: AuthService,
    private readonly rolesService: RolesService
  ) {
  }

  ngOnInit(): void {
    const snackbarRef = this.snackbarService.info('Loading roles...', false);

    this.roles$ = this.rolesService.getAll()
      .pipe(finalize(() => snackbarRef.close()));
  }

  get passwordFormControl(): FormControl {
    return this.formGroup.get('password') as FormControl;
  }

  get phoneNumberFormControl(): FormControl {
    return this.formGroup.get('phoneNumber') as FormControl;
  }

  get emailFormControl(): FormControl {
    return this.formGroup.get('email') as FormControl;
  }

  submit(): void {
    if (this.formGroup.invalid) return;

    const body: SignUpBody = this.formGroup.value;

    body.phoneNumber = `+${body.phoneNumber}`;

    const snackbarRef = this.snackbarService.info('Триває реєстрація...', false);

    this.authService.signUp(body)
      .pipe(finalize(() => snackbarRef.close()))
      .subscribe(() => this.snackbarService
        .success('Емеіл надіслано успішно. Будь ласка перевірте пошту та підтвердьте емеіл'));
  }
}
