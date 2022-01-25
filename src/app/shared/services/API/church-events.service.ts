import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {take} from 'rxjs/operators';
import {IChurchEvent, ICreateChurchEvent, IUpdateChurchEvent} from '../../interfaces/church-events.interfaces';
import {IRemoveResponse} from '../../interfaces/shared.interfaces';

@Injectable({providedIn: 'root'})
export class ChurchEventsService {
  private readonly route = 'event';

  constructor(private http: HttpClient) {
  }


  getAll(churchId: number, date: Date, limit: number, offset: number): Observable<IChurchEvent[]> {
    let params = new HttpParams();

    params = params.append('churchId', churchId.toString());
    params = params.append('date', date.toISOString());
    params = params.append('limit', limit.toString());
    params = params.append('offset', offset.toString());

    return this.http.get<IChurchEvent[]>(`${environment.url}/${this.route}/list`, {params})
      .pipe(take(1));
  }

  create(body: ICreateChurchEvent): Observable<IChurchEvent> {
    return this.http.post<IChurchEvent>(`${environment.url}/${this.route}/create`, body)
      .pipe(take(1));
  }

  update(body: IUpdateChurchEvent): Observable<IChurchEvent> {
    return this.http.put<IChurchEvent>(`${environment.url}/${this.route}/update`, body)
      .pipe(take(1));
  }

  getById(id: number): Observable<IChurchEvent> {
    let params = new HttpParams();

    params = params.append('id', id.toString());

    return this.http.get<IChurchEvent>(`${environment.url}/${this.route}`, {params})
      .pipe(take(1));
  }

  removeById(id: number): Observable<IRemoveResponse> {
    let params = new HttpParams();

    params = params.append('id', id.toString());

    return this.http.delete<IRemoveResponse>(`${environment.url}/${this.route}`, {params})
      .pipe(take(1));
  }
}
