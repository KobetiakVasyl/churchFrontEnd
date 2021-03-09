import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

import {AuthService} from "../../shared/services/auth.service";

import {fadeInAnimation} from "../../../../shared/animations";

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
      Validators.pattern(/^((\\+91-?)|0)?[0-9]{9}$/)
    ])
  });

  userCommonDataFormGroup: FormGroup = new FormGroup({
    profession: new FormControl(null, Validators.required),
    email: new FormControl(null, [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
    ])
  });

  churchDataFormGroup: FormGroup = new FormGroup({
    churchName: new FormControl(null, Validators.required),
    country: new FormControl(null, Validators.required),
    locality: new FormControl(null, Validators.required)
  });

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  get password(): FormControl {
    return this.userPersonalDataFormGroup.get('password') as FormControl;
  }

  get phoneNumber(): FormControl {
    return this.userPersonalDataFormGroup.get('phoneNumber') as FormControl;
  }

  submit(): void {
    console.log(this.userPersonalDataFormGroup.invalid || this.userCommonDataFormGroup.invalid || this.churchDataFormGroup.invalid)

    if (
      this.userPersonalDataFormGroup.invalid ||
      this.userCommonDataFormGroup.invalid ||
      this.churchDataFormGroup.invalid
    ) return;

    // this.authService.signup(this.formGroup.value).subscribe(response => {
    //   console.log(response);
    // });
  }
}
