import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, take} from "rxjs";
import {
  IRequestResetPasswordBody,
  IResetPasswordBody,
  ISignInBody,
  ISignInResponse, ISignUpBody
} from "../../interfaces/auth.interfaces";
import {environment} from "../../../../environments/environment";
import {ELocalStorage} from "../../enums/local-storage.enums";

@Injectable({providedIn: 'root'})
export class AuthService {
  private readonly route = 'auth';

  constructor(private readonly http: HttpClient) {
  }

  signIn(body: ISignInBody): Observable<ISignInResponse> {
    return this.http.post<ISignInResponse>(`${environment.URL}/${this.route}/signin`, body);
  }

  signUp(body: ISignUpBody): Observable<void> {
    body.phoneNumber = '+38' + body.phoneNumber;
    return this.http.post<void>(`${environment.URL}/${this.route}/signup`, body);
  }

  sendEmailToResetPassword(body: IRequestResetPasswordBody): Observable<void> {
    return this.http.post<void>(`${environment.URL}/${this.route}/restore`, body);
  }

  resetPassword(body: IResetPasswordBody): Observable<void> {
    return this.http.put<void>(`${environment.URL}/${this.route}/update/password`, body);
  }

  static signOut(): void {
    localStorage.removeItem(ELocalStorage.TOKEN);
    localStorage.removeItem(ELocalStorage.USER_ID);
  }
}
