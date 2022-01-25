import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IAnnouncement, ICreateAnnouncement, IUpdateAnnouncement} from '../../interfaces/announcements.interfaces';
import {environment} from '../../../../environments/environment';
import {take} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AdvertisementsService {
  private readonly route = 'announcement';

  constructor(private http: HttpClient) {
  }

  getAll(churchId: number, fromDate: Date, toDate: Date, limit: number, offset: number): Observable<IAnnouncement[]> {
    let params = new HttpParams();

    params = params.append('churchId', churchId.toString());
    params = params.append('from ', fromDate.toISOString());
    params = params.append('to ', toDate.toISOString());
    params = params.append('limit', limit.toString());
    params = params.append('offset', offset.toString());

    return this.http.get<IAnnouncement[]>(`${environment.url}/${this.route}/list`, {params})
      .pipe(take(1));
  }

  create(body: ICreateAnnouncement, images: File[] = []): Observable<IAnnouncement> {
    const formData = new FormData();

    if (images.length) {
      images.forEach(image => formData.append('image', image));
    }

    return this.http.post<IAnnouncement>(`${environment.url}/${this.route}/create`, body)
      .pipe(take(1));
  }

  update(body: IUpdateAnnouncement): Observable<IAnnouncement> {
    return this.http.put<IAnnouncement>(`${environment.url}/${this.route}/update`, body)
      .pipe(take(1));
  }
}
