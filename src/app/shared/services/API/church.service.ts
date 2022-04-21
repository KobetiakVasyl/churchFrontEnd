import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {IChurch, IChurchListItem, ICreateChurch, IUpdateChurch} from "../../interfaces/church.interfaces";
import {Observable, take} from "rxjs";
import {environment} from "../../../../environments/environment";

@Injectable({providedIn: 'root'})
export class ChurchService {
  private readonly route = 'church';

  constructor(private readonly http: HttpClient) {
  }

  search(searchValue: string | null): Observable<IChurchListItem[]> {
    let params = new HttpParams();

    params = params.append('searchTerm', searchValue ?? '');

    return this.http.get<IChurchListItem[]>(`${environment.URL}/${this.route}/search`, {params})
  }

  getById(id: string): Observable<IChurch> {
    let params = new HttpParams();

    params = params.append('id', id);

    return this.http.get<IChurch>(`${environment.URL}/${this.route}`, {params})
  }

  create(body: ICreateChurch): Observable<IChurch> {
    return this.http.post<IChurch>(`${environment.URL}/${this.route}/create`, body)
  }

  updateById(body: IUpdateChurch): Observable<IChurch> {
    return this.http.put<IChurch>(`${environment.URL}/${this.route}/update`, body)
  }

  uploadImage(churchId: string, images: File[]): Observable<void> {
    const body = new FormData();

    body.append('churchId', churchId);

    images.forEach(image => body.append('image', image));

    return this.http.post<void>(`${environment.URL}/${this.route}/upload/images`, body);
  }
}
