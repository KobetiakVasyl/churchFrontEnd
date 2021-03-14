import {Component, Input, Output, EventEmitter} from '@angular/core';
import {CardImage, AdvertisementCardInfo} from "../../interfaces";

@Component({
  selector: 'app-advertisement-card',
  templateUrl: './advertisement-card.component.html',
  styleUrls: ['./advertisement-card.component.scss']
})
export class AdvertisementCardComponent {
  @Input() cardInfo!: AdvertisementCardInfo;

  @Output() imageSelect = new EventEmitter<CardImage>();

  showFullImage(img: CardImage) {
    this.imageSelect.emit(img);
  }
}
