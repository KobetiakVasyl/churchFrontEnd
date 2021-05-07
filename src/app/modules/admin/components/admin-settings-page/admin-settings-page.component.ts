import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UpdatePasswordValidator} from '../../shared/validators/update-password.validator';

@Component({
  selector: 'app-admin-settings-page',
  templateUrl: './admin-settings-page.component.html',
  styleUrls: ['./admin-settings-page.component.scss']
})
export class AdminSettingsPageComponent implements OnInit {
  formGroup = new FormGroup({
    oldPassword: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20)
    ]),
    newPassword: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20)
    ]),
    newPasswordForComparison: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20)
    ])
  }, [UpdatePasswordValidator.compareNewPasswords]);

  constructor() {
  }

  ngOnInit(): void {
  }

  get oldPassword(): FormControl {
    return this.formGroup.get('FormControl') as FormControl;
  }

  get newPassword(): FormControl {
    return this.formGroup.get('FormControl') as FormControl;
  }

  get newPasswordForComparison(): FormControl {
    return this.formGroup.get('newPasswordForComparison') as FormControl;
  }

  submitPasswordChange(): void {

  }
}
