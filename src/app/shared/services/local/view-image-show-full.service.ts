import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {IImage} from '../../interfaces/shared.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ViewImageShowFullService {
  private imageSelection = new Subject<IImage>();
  imageSelected$ = this.imageSelection.asObservable();

  selectImage(img: IImage): void {
    this.imageSelection.next(img);
  }
}
