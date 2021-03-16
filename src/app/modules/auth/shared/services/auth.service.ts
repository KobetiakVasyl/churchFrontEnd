import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from '../../../../../environments/environment';
import {Observable} from "rxjs";
import {take} from "rxjs/operators";
import {
  POSTSendEmailToResetPasswordBody,
  POSTSignInBody,
  POSTSignInResponse,
  POSTSignUpBody,
  POSTSignUpResponse,
  PUTResetPasswordBody
} from "./interfaces";

@Injectable({providedIn: 'root'})
export class AuthService {
  constructor(private http: HttpClient) {
  }

  isAuthorized(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  signUp(body: POSTSignUpBody): Observable<POSTSignUpResponse> {
    return this.http.post<POSTSignUpResponse>(`${environment.url}/auth/signup`, body)
      .pipe(take(1));
  }

  signIn(body: POSTSignInBody): Observable<POSTSignInResponse> {
    return this.http.post<POSTSignInResponse>(`${environment.url}/auth/signin`, body)
      .pipe(take(1));
  }

  resetPassword(userId: number, body: PUTResetPasswordBody): Observable<void> {
    return this.http.put<void>(`${environment.url}/auth/update/password`, body)
      .pipe(take(1));
  }

  sendEmailToResetPassword(body: POSTSendEmailToResetPasswordBody): Observable<void> {
    return this.http.post<void>(`${environment.url}/auth/restore`, body)
      .pipe(take(1));
  }
}
