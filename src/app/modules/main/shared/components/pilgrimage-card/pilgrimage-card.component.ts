import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CardImage, PilgrimageCardInfo, PilgrimageSelectedCard} from "../../interfaces";

@Component({
  selector: 'app-pilgrimage-card',
  templateUrl: './pilgrimage-card.component.html',
  styleUrls: ['./pilgrimage-card.component.scss']
})
export class PilgrimageCardComponent implements OnInit {
  @Input() cardInfo!: PilgrimageCardInfo

  @Output() imageSelect = new EventEmitter<CardImage>();

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

  changeImage(direction: number) {
    const nextI = this.selectedImage.indexInImagesArray + direction;

    this.selectedImage.isLast = nextI >= (this.cardInfo.images.length - 1);
    this.selectedImage.isFirst = nextI <= 0
    this.selectedImage.indexInImagesArray = nextI;

    this.selectedImage.src = this.cardInfo.images[nextI].src;
    this.selectedImage.alt = this.cardInfo.images[nextI].alt;
  }

  showFullImage() {
    this.imageSelect.emit({
      alt: this.selectedImage.alt,
      src: this.selectedImage.src
    });
  }
}
