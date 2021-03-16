import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

import {AuthService} from "../../shared/services/auth.service";

import {fadeInAnimation} from "../../../../shared/animations";
import {Observable} from "rxjs";
import {Role} from "../../shared/services/interfaces";
import {RolesService} from "../../shared/services/roles.service";
import {SnackbarService} from "../../../../shared/services/snackbar.service";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss'],
  animations: [fadeInAnimation]
})

export class SignUpPageComponent implements OnInit {

  userPersonalDataFormGroup: FormGroup = new FormGroup({
    firstName: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    phoneNumber: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[0-9]*$/),
      Validators.minLength(12),
      Validators.maxLength(12)
    ])
  });

  userCommonDataFormGroup: FormGroup = new FormGroup({
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

  churchDataFormGroup: FormGroup = new FormGroup({
    churchName: new FormControl(null, Validators.required),
    country: new FormControl(null, Validators.required),
    locality: new FormControl(null, Validators.required)
  });

  $roles!: Observable<Role[]>;

  constructor(
    private snackbarService: SnackbarService,
    private rolesService: RolesService,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.$roles = this.rolesService.getAll();
  }

  get password(): FormControl {
    return this.userPersonalDataFormGroup.get('password') as FormControl;
  }

  get phoneNumber(): FormControl {
    return this.userPersonalDataFormGroup.get('phoneNumber') as FormControl;
  }

  get email(): FormControl {
    return this.userCommonDataFormGroup.get('email') as FormControl;
  }

  submit(): void {
    if (
      this.userPersonalDataFormGroup.invalid ||
      this.userCommonDataFormGroup.invalid ||
      this.churchDataFormGroup.invalid
    ) return;

    const userPersonalDataFormGroup = this.userPersonalDataFormGroup.value;

    userPersonalDataFormGroup.phoneNumber = `+${userPersonalDataFormGroup.phoneNumber}`;

    const body = {
      ...userPersonalDataFormGroup,
      ...this.userCommonDataFormGroup.value,
      ...this.churchDataFormGroup.value
    }

    const snackbarRef = this.snackbarService.info('Триває реєстрація...', false);

    this.authService.signUp(body)
      .pipe(finalize(() => snackbarRef.close()))
      .subscribe(() => {
        this.router.navigate(['', 'auth', 'login']).then(() => {
          this.snackbarService.success("Запит на реєстрацію прийнято. Будь ласка зачекайте поки правдивість інформації буде підтверджена")
        });
      });
  }
}
