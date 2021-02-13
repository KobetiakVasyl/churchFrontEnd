import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../../auth/shared/services/auth.service";

@Component({
  selector: 'admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {
  isOpened = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
  }

  logout() {
    // this.authService.logout().subsc
    this.router.navigate(['', 'overview']);
  }
}
