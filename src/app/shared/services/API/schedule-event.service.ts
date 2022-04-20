import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {ICreateScheduleEvent, IScheduleEvent, IUpdateScheduleEvent} from "../../interfaces/schedule-event.interfaces";
import {Observable, take} from "rxjs";
import {environment} from "../../../../environments/environment";

@Injectable({providedIn: 'root'})
export class ScheduleEventService {
  private readonly route = 'event';

  constructor(private readonly http: HttpClient) {
  }

  create(body: ICreateScheduleEvent): Observable<IScheduleEvent> {
    return this.http.post<IScheduleEvent>(`${environment.URL}/${this.route}/create`, body)
      .pipe(take(1));
  }

  update(body: IUpdateScheduleEvent): Observable<IScheduleEvent> {
    return this.http.patch<IScheduleEvent>(`${environment.URL}/${this.route}/update`, body)
      .pipe(take(1));
  }

  getById(id: number): Observable<IScheduleEvent> {
    let params = new HttpParams();

    params = params.append('id', id);

    return this.http.get<IScheduleEvent>(`${environment.URL}/${this.route}`, {params})
      .pipe(take(1));
  }

  getByParams(churchId: number | string, date: string | Date, offset: number, limit: number): Observable<IScheduleEvent[]> {
    let params = new HttpParams();

    params = params.append('churchId', churchId);
    params = params.append('date', date instanceof Date ? date.toISOString() : date);
    params = params.append('offset', offset);
    params = params.append('limit', limit);

    return this.http.get<IScheduleEvent[]>(`${environment.URL}/${this.route}/list`, {params})
      .pipe(take(1));
  }

  removeById(id: number): Observable<void> {
    let params = new HttpParams();

    params = params.append('id', id);

    return this.http.delete<void>(`${environment.URL}/${this.route}/delete`, {params})
      .pipe(take(1));
  }
}
