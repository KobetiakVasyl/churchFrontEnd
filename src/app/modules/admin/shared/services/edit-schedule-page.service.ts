import { Injectable } from '@angular/core';
import {EMPTY, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditSchedulePageService {

  constructor() { }

  handleAddEvent(): Observable<any> {
    return EMPTY;
  }
}
