import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {EEmailValidation} from "../../../../shared/enums/form-validation.enums";
import {AuthService} from "../../../../shared/services/API/auth.service";
import {ErrorMessageService} from "../../../../shared/services/local/error-message.service";
import {AuthTransferDataService} from "../../shared/services/auth-transfer-data.service";
import {Observable} from "rxjs";
import {HttpLoadingService} from "../../../../shared/services/local/http-loading.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  providers: [ErrorMessageService]
})
export class ForgotPasswordComponent implements OnInit {
  readonly emailFormControl = new FormControl(null, [
    Validators.email,
    Validators.required,
    Validators.minLength(EEmailValidation.MIN),
  ]);

  showSuccessMessage = false;

  constructor(
    private readonly authTransferDataService: AuthTransferDataService,
    readonly errorMessageService: ErrorMessageService,
    private readonly authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.authTransferDataService.changeToolbarTitle('forgot password');
  }

  get showLoading(): Observable<boolean> {
    return HttpLoadingService.showLoading$;
  }

  handleSubmit(): void {
    if (this.emailFormControl.invalid) return;

    this.errorMessageService.hideErrorMessage();

    this.authService.sendEmailToResetPassword({email: this.emailFormControl.value})
      .subscribe({
        next: () => this.showSuccessMessage = true,
        error: error => {
          this.errorMessageService.errorMessage = error.message;
          this.errorMessageService.showErrorMessage()
        }
      })
  }
}
