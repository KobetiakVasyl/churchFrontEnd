import {Component, Input, OnInit} from '@angular/core';
import {ISelectedImage} from '../../interfaces/shared.interfaces';
import {ViewImageShowFullService} from '../../services/local/view-image-show-full.service';
import {IImage} from '../../interfaces/shared.interfaces';

@Component({
  selector: 'app-single-image-viewer',
  templateUrl: './single-image-viewer.component.html',
  styleUrls: ['./single-image-viewer.component.scss']
})
export class SingleImageViewerComponent implements OnInit {
  @Input() alt: string = 'N/A';
  @Input() images: IImage[] = [];

  selectedImage: ISelectedImage = {
    id: 0,
    url: '#',
    indexInImagesArray: 0,
    isFirst: true,
    isLast: true
  };

  constructor(private viewImageShowFullService: ViewImageShowFullService) {
  }

  ngOnInit(): void {
    if (this.images.length) {
      this.selectedImage.id = this.images[0].id;
      this.selectedImage.url = this.images[0].url;
      this.selectedImage.isLast = this.images.length === 1;
    }
  }


  changeImage(direction: number): void {
    const nextI = this.selectedImage.indexInImagesArray + direction;

    this.selectedImage.isLast = nextI >= (this.images.length - 1);
    this.selectedImage.isFirst = nextI <= 0;
    this.selectedImage.indexInImagesArray = nextI;

    this.selectedImage.id = this.images[nextI].id;
    this.selectedImage.url = this.images[nextI].url;
  }

  showFullImage(): void {
    this.viewImageShowFullService.selectImage({
      id: this.selectedImage.id,
      url: this.selectedImage.url
    });
  }
}
