import {Component, OnInit} from '@angular/core';
import {AuthTransferDataService} from "../../shared/services/auth-transfer-data.service";
import {ErrorMessageService} from "../../../../shared/services/local/error-message.service";
import {AuthService} from "../../../../shared/services/API/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EEmailValidation, EPasswordValidation} from "../../../../shared/enums/form-validation.enums";
import {map, Observable, switchMap} from "rxjs";
import {HttpLoadingService} from "../../../../shared/services/local/http-loading.service";
import {RoleService} from "../../../../shared/services/API/role.service";
import {ERole} from "../../../../shared/enums/role.enums";
import {IRole} from "../../../../shared/interfaces/role.interfaces";
import {ISignUpBody} from "../../../../shared/interfaces/auth.interfaces";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  providers: [ErrorMessageService]
})
export class SignUpComponent implements OnInit {
  readonly formGroup = new FormGroup({
    firstName: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    phoneNumber: new FormControl(null, [
      Validators.required,
      Validators.pattern(/[0-9]{10}/),
    ]),
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

  showSuccessMessage = false;

  constructor(
    private readonly authTransferDataService: AuthTransferDataService,
    readonly errorMessageService: ErrorMessageService,
    private readonly authService: AuthService,
    private readonly roleService: RoleService
  ) {
  }

  ngOnInit(): void {
    this.authTransferDataService.changeToolbarTitle('sign up');
  }

  get phoneNumberFormControl(): FormControl {
    return this.formGroup.get('phoneNumber') as FormControl;

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

    this.roleService.getAll()
      .pipe(
        map(value => value.find(({roleName}) => roleName === ERole.USER) as IRole),
        switchMap(value => {
          console.log(value);
          const formValue = this.formGroup.getRawValue();

          formValue.phoneNumber = '+38' + formValue.phoneNumber;

          const body: ISignUpBody = {
            roleId: value.id,
            ...formValue
          };

          return this.authService.signUp(body);
        })
      )
      .subscribe({
        next: () => this.showSuccessMessage = true,
        error: error => {
          this.errorMessageService.errorMessage = error.message;
          this.errorMessageService.showErrorMessage()
        }
      })
  }
}
