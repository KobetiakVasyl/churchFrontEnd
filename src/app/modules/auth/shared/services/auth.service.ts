import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from '../../../../../environments/environment';
import {Observable} from "rxjs";
import {take} from "rxjs/operators";

interface SignUpBody {
  name: string;
  email: string;
  password: string;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  constructor(private http: HttpClient) {
  }

  isAuthorized(): boolean {
    return true;
    // return !!localStorage.getItem('token');
  }

  signUp(body: SignUpBody): Observable<any> {
    return this.http.post(`${environment.url}/auth/signup`, body)
      .pipe(take(1));
  }

  signIn(body: SignUpBody): Observable<any> {
    return this.http.post(`${environment.url}/auth/signin`, body)
      .pipe(take(1));
  }

  logout(): void {

  }
}
