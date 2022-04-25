import {Component, ElementRef, Input, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {IImage} from "../../interfaces/image.interfaces";
import {ShowFullImageService} from "../show-full-image/show-full-image.service";

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss']
})
export class ImageCarouselComponent {
  @Input() images: IImage[] = [];

  @ViewChild('imageSlider') imageSlider!: ElementRef;
  @ViewChildren('imagesList') htmlImageElements!: QueryList<ElementRef>;

  selectedImageIndex = 0;

  constructor(private readonly showFullImageService: ShowFullImageService) {
  }

  changeImage(direction: number): void {
    if (
      (direction < 0 && this.selectedImageIndex == 0) ||
      (direction > 0 && this.selectedImageIndex === (this.images.length - 1))
    ) return;

    this.selectedImageIndex += direction;

    // @ts-ignore
    const image = this.htmlImageElements.get(this.selectedImageIndex).nativeElement as HTMLImageElement;

    this.imageSlider.nativeElement.scrollTo({
      left: image.scrollWidth * this.selectedImageIndex,
      behavior: 'smooth'
    });
  }

  selectImage(image: IImage) {
    this.showFullImageService.selectImage(image);
  }
}
