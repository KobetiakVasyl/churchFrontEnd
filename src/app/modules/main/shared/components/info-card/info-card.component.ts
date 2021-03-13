import {Component, Input, Output, EventEmitter} from '@angular/core';
import {CardImage, CardInfo} from "../../interfaces";

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss']
})
export class InfoCardComponent {
  @Input() cardInfo!: CardInfo;

  @Output() imageSelect = new EventEmitter<CardImage>();

  showFullImage(img: CardImage) {
    this.imageSelect.emit(img);
  }
}
