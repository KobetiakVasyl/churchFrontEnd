import {Component, Input, OnInit} from '@angular/core';
import {CardImage, PilgrimageSelectedCard} from '../../interfaces/shared.interfaces';
import {ViewImageShowFullService} from '../../services/local/view-image-show-full.service';

@Component({
  selector: 'app-single-image-viewer',
  templateUrl: './single-image-viewer.component.html',
  styleUrls: ['./single-image-viewer.component.scss']
})
export class SingleImageViewerComponent implements OnInit {
  @Input() images: any[] = [];

  selectedImage: PilgrimageSelectedCard = {
    alt: '#',
    src: '#',
    indexInImagesArray: 0,
    isFirst: true,
    isLast: true
  };

  constructor(private viewImageShowFullService: ViewImageShowFullService) {
  }

  ngOnInit(): void {
    if (this.images.length) {
      this.selectedImage.alt = this.images[0].alt;
      this.selectedImage.src = this.images[0].src;
      this.selectedImage.isLast = this.images.length === 1;
    }
  }


  changeImage(direction: number): void {
    const nextI = this.selectedImage.indexInImagesArray + direction;

    this.selectedImage.isLast = nextI >= (this.images.length - 1);
    this.selectedImage.isFirst = nextI <= 0;
    this.selectedImage.indexInImagesArray = nextI;

    this.selectedImage.src = this.images[nextI].src;
    this.selectedImage.alt = this.images[nextI].alt;
  }

  showFullImage(): void {
    this.viewImageShowFullService.selectImage({
      alt: this.selectedImage.alt,
      src: this.selectedImage.src
    });
  }
}
