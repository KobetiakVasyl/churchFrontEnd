import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {CardImage} from '../../interfaces/shared.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ViewImageShowFullService {
  private imageSelection = new Subject<CardImage>();
  imageSelected = this.imageSelection.asObservable();

  selectImage(img: CardImage): void {
    this.imageSelection.next(img);
  }
}
