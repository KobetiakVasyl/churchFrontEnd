import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from '../../../../../environments/environment';
import {Observable} from "rxjs";
import {take} from "rxjs/operators";
import {POSTSignInBody, POSTSignInResponse, POSTSignUpBody, POSTSignUpResponse} from "./interfaces";

@Injectable({providedIn: 'root'})
export class AuthService {
  constructor(private http: HttpClient) {
  }

  isAuthorized(): boolean {
    return !!localStorage.getItem('token');
  }

  signUp(body: POSTSignUpBody): Observable<POSTSignUpResponse> {
    return this.http.post<POSTSignUpResponse>(`${environment.url}/auth/signup`, body)
      .pipe(take(1));
  }

  signIn(body: POSTSignInBody): Observable<POSTSignInResponse> {
    return this.http.post<POSTSignInResponse>(`${environment.url}/auth/signin`, body)
      .pipe(take(1));
  }
}
