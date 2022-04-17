import {AbstractControl, FormControl, ValidationErrors} from '@angular/forms';

export class UpdatePasswordValidator {
  static compareNewPasswords(formGroup: AbstractControl): ValidationErrors | null {
    const password = formGroup.get('password') as FormControl;
    const passwordForComparison = formGroup.get('passwordForComparison') as FormControl;

    if (password.dirty && passwordForComparison.dirty && password.value !== passwordForComparison.value) {
      passwordForComparison.setErrors({passwordsMismatch: true});
    }

    return null;
  }
}
