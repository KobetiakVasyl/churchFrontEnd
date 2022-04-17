import {Component, OnInit} from '@angular/core';
import {AuthTransferDataService} from "../../shared/services/auth-transfer-data.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EEmailValidation, EPasswordValidation} from "../../../../shared/enums/form-validation.enums";
import {Observable} from "rxjs";
import {HttpLoadingService} from "../../../../shared/services/local/http-loading.service";
import {AuthService} from "../../../../shared/services/API/auth.service";
import {ErrorMessageService} from "../../../../shared/services/local/error-message.service";
import {ELocalStorage} from "../../../../shared/enums/local-storage.enums";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  providers: [ErrorMessageService]
})
export class SignInComponent implements OnInit {
  readonly formGroup = new FormGroup({
    email: new FormControl(null, [
      Validators.email,
      Validators.required,
      Validators.minLength(EEmailValidation.MIN),
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(EPasswordValidation.MIN),
      Validators.maxLength(EPasswordValidation.MAX)
    ])
  });

  constructor(
    private readonly authTransferDataService: AuthTransferDataService,
    readonly errorMessageService: ErrorMessageService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
  }

  ngOnInit(): void {
    this.authTransferDataService.changeToolbarTitle('sign in');
  }

  get emailFormControl(): FormControl {
    return this.formGroup.get('email') as FormControl;
  }

  get passwordFormControl(): FormControl {
    return this.formGroup.get('password') as FormControl;
  }

  get showLoading(): Observable<boolean> {
    return HttpLoadingService.showLoading$;
  }

  handleSubmit(): void {
    if (this.formGroup.invalid) return;

    this.errorMessageService.hideErrorMessage();

    this.authService.signIn(this.formGroup.getRawValue())
      .subscribe({
        next: value => {
          localStorage.setItem(ELocalStorage.TOKEN, value.token)
          this.router.navigate(['', 'admin']);
        },
        error: error => {
          this.errorMessageService.errorMessage = error.message;
          this.errorMessageService.showErrorMessage()
        }
      });
  }
}
