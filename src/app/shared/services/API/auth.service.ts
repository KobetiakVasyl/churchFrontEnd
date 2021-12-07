import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';
import {
  SendEmailToResetPasswordBody,
  SignInBody,
  SignInResponse,
  ResetPasswordBody,
  SignUpBody,
  SignUpResponse
} from '../../interfaces/auth.interfaces';

@Injectable({providedIn: 'root'})
export class AuthService {
  private readonly route = 'auth';

  constructor(private http: HttpClient) {
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  signUp(body: SignUpBody): Observable<SignUpResponse> {
    return this.http.post<SignUpResponse>(`${environment.url}/${this.route}/signup`, body)
      .pipe(take(1));
  }

  signIn(body: SignInBody): Observable<SignInResponse> {
    return this.http.post<SignInResponse>(`${environment.url}/${this.route}/signin`, body)
      .pipe(take(1));
  }

  resetPassword(userId: number, body: ResetPasswordBody): Observable<void> {
    return this.http.put<void>(`${environment.url}/${this.route}/update/password`, body)
      .pipe(take(1));
  }

  sendEmailToResetPassword(body: SendEmailToResetPasswordBody): Observable<void> {
    return this.http.post<void>(`${environment.url}/${this.route}/restore`, body)
      .pipe(take(1));
  }
}
