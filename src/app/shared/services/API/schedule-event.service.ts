import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {ICreateScheduleEvent, IScheduleEvent, IUpdateScheduleEvent} from "../../interfaces/schedule-event.interfaces";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import { format, formatISO } from "date-fns";

@Injectable({providedIn: 'root'})
export class ScheduleEventService {
  private readonly route = 'event';

  constructor(private readonly http: HttpClient) {
  }

  create(body: ICreateScheduleEvent): Observable<IScheduleEvent> {
    body.date = formatISO(body.date as Date, { representation: 'date' });
    return this.http.post<IScheduleEvent>(`${environment.URL}/${this.route}/create`, body);
  }

  update(body: IUpdateScheduleEvent): Observable<IScheduleEvent> {
    return this.http.patch<IScheduleEvent>(`${environment.URL}/${this.route}/update`, body);
  }

  getById(id: number): Observable<IScheduleEvent> {
    let params = new HttpParams();

    params = params.append('id', id);

    return this.http.get<IScheduleEvent>(`${environment.URL}/${this.route}`, {params});
  }

  getByParams(churchId: number | string, date: Date, offset: number, limit: number): Observable<IScheduleEvent[]> {
    const dateToSend = formatISO(date, {representation: 'date'});

    let params = new HttpParams();

    params = params.append('churchId', churchId);
    params = params.append('date', dateToSend);
    params = params.append('offset', offset);
    params = params.append('limit', limit);

    return this.http.get<IScheduleEvent[]>(`${environment.URL}/${this.route}/list`, {params});
  }

  removeById(id: number): Observable<void> {
    let params = new HttpParams();

    params = params.append('id', id);

    return this.http.delete<void>(`${environment.URL}/${this.route}/delete`, {params});
  }
}
