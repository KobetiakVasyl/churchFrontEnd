import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {
  IAnnouncement,
  IAnnouncementPartialList,
  ICreateAnnouncement,
  IUpdateAnnouncement
} from "../../interfaces/announcement.interfaces";
import {map, Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {formatISO} from "date-fns";
import {IImage} from "../../interfaces/image.interfaces";

@Injectable({providedIn: 'root'})
export class AnnouncementService {
  private readonly route = 'announcement';

  constructor(private readonly http: HttpClient) {
  }

  create(body: ICreateAnnouncement): Observable<IAnnouncement> {
    return this.http.post<IAnnouncement>(`${environment.URL}/${this.route}/create`, body);
  }

  update(body: IUpdateAnnouncement): Observable<IAnnouncement> {
    return this.http.put<IAnnouncement>(`${environment.URL}/${this.route}/update`, body);
  }

  uploadImages(churchId: number, announcementId: number, images: File[]): Observable<IImage[]> {
    const formData = new FormData();

    formData.append('churchId', churchId.toString());
    formData.append('announcementId', announcementId.toString());

    images.forEach(image => formData.append('image', image));

    return this.http.patch<IAnnouncement>(`${environment.URL}/${this.route}/upload/images`, formData)
      .pipe(map(value => value.images));
  }

  removeImageById(imageId: number): Observable<void> {
    let params = new HttpParams();

    params = params.append('id', imageId);

    return this.http.delete<void>(`${environment.URL}/${this.route}/delete/image`, {params});
  }

  getByParams(dateFrom: Date | null, dateTo: Date, churchId: number, offset: number, limit: number): Observable<IAnnouncementPartialList> {
    const dateFromToSend = dateFrom ? formatISO(dateFrom, {representation: 'date'}) : '';
    const dateToToSend = formatISO(dateTo, {representation: 'date'});

    let params = new HttpParams();

    params = params.append('from', dateFromToSend);
    params = params.append('to', dateToToSend);
    params = params.append('churchId', churchId);
    params = params.append('offset', offset);
    params = params.append('limit', limit);

    return this.http.get<IAnnouncementPartialList>(`${environment.URL}/${this.route}/list`, {params});
  }

  getById(id: string): Observable<IAnnouncement> {
    let params = new HttpParams();

    params = params.append('id', id);

    return this.http.get<IAnnouncement>(`${environment.URL}/${this.route}/one`, {params});
  }
}
