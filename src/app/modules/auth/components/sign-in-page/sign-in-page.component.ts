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
    private authService: AuthService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    setTimeout(() => this.shouldShowForm = true, 200);
  }

  get password(): FormControl {
    return this.formGroup.get('password') as FormControl;
  }

  submit(): void {
    if (this.formGroup.invalid) return;

    this.authService.signIn(this.formGroup.value).subscribe(response => {
      console.log(response);
      localStorage.setItem('token', response.token);
      this.router.navigate(['', 'admin', 'overview']);
    });
  }
}
