import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({providedIn: 'root'})
export class SelectChurchService {
  filter$ = new BehaviorSubject<string | null>(null);

  changeFilter(value: string): void {
    this.filter$.next(value);
  }
}
