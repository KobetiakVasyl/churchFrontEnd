import {Component, Input} from '@angular/core';
import {IImage} from '../../../../../shared/interfaces/shared.interfaces';

interface ICardData {
  images: IImage[];

  [key: string]: any;
}

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss']
})
export class InfoCardComponent {
  @Input() cardData!: ICardData;
}
