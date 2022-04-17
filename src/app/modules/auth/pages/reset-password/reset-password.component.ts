import {Component, OnInit} from '@angular/core';
import {AuthTransferDataService} from "../../shared/services/auth-transfer-data.service";
import {ErrorMessageService} from "../../../../shared/services/local/error-message.service";
import {AuthService} from "../../../../shared/services/API/auth.service";
import {Observable} from "rxjs";
import {HttpLoadingService} from "../../../../shared/services/local/http-loading.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EPasswordValidation} from "../../../../shared/enums/form-validation.enums";
import {ActivatedRoute, Router} from "@angular/router";
import {UpdatePasswordValidator} from "../../../../shared/form-validators/update-password.validator";
import {IResetPasswordBody} from "../../../../shared/interfaces/auth.interfaces";
import {ELocalStorage} from "../../../../shared/enums/local-storage.enums";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  providers: [ErrorMessageService]
})
export class ResetPasswordComponent implements OnInit {
  private userId!: number;
  private token!: string;

  readonly formGroup = new FormGroup({
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(EPasswordValidation.MIN),
      Validators.maxLength(EPasswordValidation.MAX)
    ]),
    passwordForComparison: new FormControl(null, [
      Validators.required,
      Validators.minLength(EPasswordValidation.MIN),
      Validators.maxLength(EPasswordValidation.MAX)
    ])
  }, UpdatePasswordValidator.compareNewPasswords);

  constructor(
    private readonly authTransferDataService: AuthTransferDataService,
    readonly errorMessageService: ErrorMessageService,
    private readonly authService: AuthService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {
  }

  ngOnInit(): void {
    this.authTransferDataService.changeToolbarTitle('reset password');

    this.route.queryParams.subscribe((params) => {
      if (params['userId'] && params['token']) {
        this.userId = +params['userId'];
        this.token = params['token'];
      } else {
        AuthService.signOut();
        this.router.navigate(['', 'auth']);
      }
    });
  }

  get passwordFormControl(): FormControl {
    return this.formGroup.get('password') as FormControl;
  }

  get passwordForComparisonFormControl(): FormControl {
    return this.formGroup.get('passwordForComparison') as FormControl;
  }

  get showLoading(): Observable<boolean> {
    return HttpLoadingService.showLoading$;
  }

  handleSubmit(): void {
    if (this.formGroup.invalid) return;

    this.errorMessageService.hideErrorMessage();

    localStorage.setItem(ELocalStorage.TOKEN, this.token);

    const body: IResetPasswordBody = {
      userId: this.userId,
      ...this.formGroup.getRawValue()
    }

    this.authService.resetPassword(body)
      .subscribe({
        next: () => {
          AuthService.signOut();
          this.router.navigate(['', 'auth', 'sign-in']);
        },
        error: error => {
          this.errorMessageService.errorMessage = error.message;
          this.errorMessageService.showErrorMessage()
        }
      })
  }
}
