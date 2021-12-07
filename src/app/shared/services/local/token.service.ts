import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class TokenService {
  static isAuthorized(): boolean {
    return !!localStorage.getItem('token');
  }
}
