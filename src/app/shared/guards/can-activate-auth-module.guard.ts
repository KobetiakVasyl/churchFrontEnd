import {Injectable} from '@angular/core';
import {
  Router,
  UrlTree,
  CanActivate,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {Observable} from 'rxjs';

import {SnackbarService} from "../services/snackbar.service";
import {AuthService} from "../../modules/auth/shared/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class CanActivateAuthModuleGuard implements CanActivate {
  constructor(
    private snackbarService: SnackbarService,
    private authService: AuthService,
    private router: Router
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isAuthorized()) {
      this.router.navigate(['', 'page-not-found']);

      this.snackbarService.error('Для повторного входу вийдіть із теперішнього');

      return false;
    } else {
      return true;
    }
  }

}
