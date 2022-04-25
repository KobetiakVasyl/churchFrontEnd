import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {IImage} from "../../interfaces/image.interfaces";

@Injectable({providedIn: 'root'})
export class ShowFullImageService {
  readonly image$ = new Subject<IImage | null>();

  selectImage(value: IImage | null): void {
    this.image$.next(value);
  }
}
