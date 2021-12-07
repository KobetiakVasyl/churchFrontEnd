import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';

import {environment} from '../../../../environments/environment';

import {Role} from '../../interfaces/roles.interfaces';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private readonly route = 'auth/roles';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Role[]> {
    return this.http.get<Role[]>(`${environment.url}/${this.route}`)
      .pipe(take(1));
  }
}
