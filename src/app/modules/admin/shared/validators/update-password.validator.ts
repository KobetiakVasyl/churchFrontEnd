import {AbstractControl, FormControl, ValidationErrors} from '@angular/forms';

export class UpdatePasswordValidator {
  static compareNewPasswords(formGroup: AbstractControl): ValidationErrors | null {
    const newPassword = formGroup.get('newPassword') as FormControl;
    const newPasswordForComparison = formGroup.get('newPasswordForComparison') as FormControl;

    if (newPassword.dirty && newPasswordForComparison.dirty && newPassword.value !== newPasswordForComparison.value) {
      newPasswordForComparison.setErrors({newPasswordsMismatched: true});
    }

    return null;
  }
}
