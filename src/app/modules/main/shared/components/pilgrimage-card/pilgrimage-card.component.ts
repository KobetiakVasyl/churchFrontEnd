import {Component, Input, OnInit} from '@angular/core';
import {PilgrimageCardInfo, PilgrimageSelectedCard} from '../../interfaces';

@Component({
  selector: 'app-pilgrimage-card',
  templateUrl: './pilgrimage-card.component.html',
  styleUrls: ['./pilgrimage-card.component.scss']
})
export class PilgrimageCardComponent implements OnInit {
  @Input() cardInfo!: PilgrimageCardInfo;

  selectedImage!: PilgrimageSelectedCard;

  constructor() {
  }

  ngOnInit(): void {
    if (this.cardInfo.images.length) {
      this.selectedImage = {
        ...this.cardInfo.images[0],
        isFirst: true,
        isLast: this.cardInfo.images.length === 1,
        indexInImagesArray: 0
      };
    }
  }
}
