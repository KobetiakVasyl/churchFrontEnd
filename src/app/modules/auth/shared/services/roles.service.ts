import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {take} from "rxjs/operators";

import {environment} from "../../../../../environments/environment";

import {Role} from "./interfaces";

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Role[]> {
    return this.http.get<Role[]>(`${environment.url}/auth/roles`)
      .pipe(take(1));
  }
}
