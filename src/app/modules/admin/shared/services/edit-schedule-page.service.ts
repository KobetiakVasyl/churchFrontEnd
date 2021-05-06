import { Injectable } from '@angular/core';
import {EMPTY, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditSchedulePageService {

  constructor() { }

  addEvent(): Observable<any> {
    return EMPTY;
  }
}
