import {Injectable} from '@angular/core';
import {
  Router,
  UrlTree,
  CanActivate,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {Observable} from 'rxjs';

import {SnackbarService} from '../services/local/snackbar.service';
import {TokenService} from '../services/local/token.service';

@Injectable({providedIn: 'root'})
export class CanActivateAuthModuleGuard implements CanActivate {
  constructor(
    private snackbarService: SnackbarService,
    private router: Router
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (TokenService.isAuthorized()) {
      this.router.navigate(['', 'page-not-found']);

      this.snackbarService.error('Для повторного входу вийдіть із теперішнього');

      return false;
    } else {
      return true;
    }
  }

}
