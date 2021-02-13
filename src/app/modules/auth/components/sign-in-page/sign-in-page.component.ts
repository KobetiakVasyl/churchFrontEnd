import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

import {AuthService} from "../../shared/services/auth.service";

import {bounceInDownAnimation, fadeInAnimation} from "../../../../shared/animations";

@Component({
  selector: 'sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss'],
  animations: [bounceInDownAnimation, fadeInAnimation]
})
export class SignInPageComponent implements OnInit {
  shouldShowForm = false;

  formGroup: FormGroup = new FormGroup({
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

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    setTimeout(() => this.shouldShowForm = true, 200);
  }

  get password(): FormControl {
    return this.formGroup.get('password') as FormControl;
  }

  submit() {
    this.router.navigate(['', 'admin', 'overview']);

    // if (this.formGroup.invalid) return;

    // this.authService.signIn(this.formGroup.value).subscribe(response => {
      // localStorage.setItem('user', JSON.stringify(this.formGroup.value));
      // console.log(response);
    // })
  }
}
