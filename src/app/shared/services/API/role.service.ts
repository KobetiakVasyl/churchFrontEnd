import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, take} from "rxjs";
import {environment} from "../../../../environments/environment";
import {IRole} from "../../interfaces/role.interfaces";

@Injectable({providedIn: 'root'})
export class RoleService {
  private readonly route = 'auth/roles';

  constructor(private readonly http: HttpClient) {
  }

  getAll(): Observable<IRole[]> {
    return this.http.get<IRole[]>(`${environment.URL}/${this.route}`)
      .pipe(take(1));
  }
}
