import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Church, ChurchListItem, CreateChurchBody} from '../../interfaces/church.interfaces';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {take} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class ChurchService {
  private readonly route = 'church';

  constructor(private http: HttpClient) {
  }

  create(body: CreateChurchBody): Observable<Church> {
    return this.http.post<Church>(`${environment.url}/${this.route}/create`, body)
      .pipe(take(1));
  }

  search(searchValue: string): Observable<ChurchListItem[]> {
    let params = new HttpParams();

    params = params.append('search', searchValue);

    return this.http.get<ChurchListItem[]>(`${environment.url}/${this.route}/search`, {params})
      .pipe(take(1));
  }
}
