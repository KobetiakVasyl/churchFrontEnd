import {Component, Input} from '@angular/core';
import {IImage} from "../../interfaces/image.interfaces";

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss']
})
export class ImageCarouselComponent {
  @Input() images: IImage[] = [];

  changeScroll(imageSlider: HTMLDivElement, next: boolean): void {
    const amount = imageSlider.scrollWidth / this.images.length;
    imageSlider.scrollLeft += next ? amount : -amount;
  }
}
