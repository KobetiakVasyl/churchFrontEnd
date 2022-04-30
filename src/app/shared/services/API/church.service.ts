import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {
  IChurch,
  IChurchListItem,
  IChurchPartialList,
  ICreateChurch,
  IUpdateChurch
} from "../../interfaces/church.interfaces";
import {map, Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {IImage} from "../../interfaces/image.interfaces";

@Injectable({providedIn: 'root'})
export class ChurchService {
  private readonly route = 'church';

  constructor(private readonly http: HttpClient) {
  }

  getByParams(offset: number, limit: number): Observable<IChurchPartialList> {
    let params = new HttpParams();

    params = params.append('offset', offset);
    params = params.append('limit', limit);

    return this.http.get<IChurchPartialList>(`${environment.URL}/${this.route}/list`, {params});
  }

  getForAuthorizedByParams(offset: number, limit: number): Observable<IChurchPartialList> {
    let params = new HttpParams();

    params = params.append('offset', offset);
    params = params.append('limit', limit);

    return this.http.get<IChurchPartialList>(`${environment.URL}/${this.route}/my/list`, {params});
  }

  search(searchValue: string | null): Observable<IChurchListItem[]> {
    let params = new HttpParams();

    params = params.append('searchTerm', searchValue ?? '');

    return this.http.get<IChurchListItem[]>(`${environment.URL}/${this.route}/search`, {params})
  }

  getById(id: string): Observable<IChurch> {
    let params = new HttpParams();

    params = params.append('id', id);

    return this.http.get<IChurch>(`${environment.URL}/${this.route}`, {params}).pipe(
      map(value => {
        value.phoneNumber = value.phoneNumber.slice(3, value.phoneNumber.length);
        return value;
      })
    );
  }

  create(body: ICreateChurch): Observable<IChurch> {
    return this.http.post<IChurch>(`${environment.URL}/${this.route}/create`, body)
  }

  updateById(body: IUpdateChurch): Observable<IChurch> {
    body.phoneNumber = '+38' + body.phoneNumber;
    return this.http.put<IChurch>(`${environment.URL}/${this.route}/update`, body)
  }

  uploadImage(churchId: string, images: FileList): Observable<IImage[]> {
    const formData = new FormData();

    formData.append('churchId', churchId);

    for (let i = 0; i < images.length; i++) {
      formData.append('image', images.item(i) as File);
    }

    return this.http.post<IChurch>(`${environment.URL}/${this.route}/upload/images`, formData)
      .pipe(map(value => value.images));
  }

  removeImageById(imageId: number): Observable<void> {
    let params = new HttpParams();

    params = params.append('id', imageId);

    return this.http.delete<void>(`${environment.URL}/${this.route}/delete/image`, {params});
  }
}
