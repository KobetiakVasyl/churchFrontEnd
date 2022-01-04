import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {IChurch, IChurchItem, ICreateChurch, IUpdateChurch} from '../../interfaces/church.interfaces';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {take} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class ChurchService {
  private readonly route = 'church';

  constructor(private http: HttpClient) {
  }

  getById(id: string): Observable<IChurch> {
    let params = new HttpParams();

    params = params.append('id', id);

    return this.http.get<IChurch>(`${environment.url}/${this.route}`, {params})
      .pipe(take(1));
  }

  create(body: ICreateChurch): Observable<IChurch> {
    return this.http.post<IChurch>(`${environment.url}/${this.route}/create`, body)
      .pipe(take(1));
  }

  updateById(body: IUpdateChurch): Observable<IChurch> {
    return this.http.put<IChurch>(`${environment.url}/${this.route}/update`, body)
      .pipe(take(1));
  }

  uploadImage(churchId: string, images: File[]): Observable<void> {
    const body = new FormData();

    body.append('churchId', churchId);

    images.forEach(image => body.append('image', image));

    return this.http.post<void>(`${environment.url}/${this.route}/upload/images`, body)
  }

  search(searchValue: string): Observable<IChurchItem[]> {
    let params = new HttpParams();

    params = params.append('searchTerm', searchValue);

    return this.http.get<IChurchItem[]>(`${environment.url}/${this.route}/search`, {params})
      .pipe(take(1));
  }
}
