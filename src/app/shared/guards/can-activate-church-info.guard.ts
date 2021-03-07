import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CanActivateChurchInfoGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const churchInfo = JSON.parse(<string>localStorage.getItem('churchInfo'));

    if (!churchInfo || !churchInfo.hasOwnProperty('name') || !churchInfo.hasOwnProperty('id')) {
      this.router.navigate(['page-not-found']);
    }

    return true;
  }

}
