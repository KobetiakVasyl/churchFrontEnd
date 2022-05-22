import {
  AfterContentChecked,
  AfterContentInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {IImage} from "../../interfaces/image.interfaces";
import {ShowFullImageService} from "../show-full-image/show-full-image.service";
import {BehaviorSubject, ReplaySubject, Subject} from "rxjs";

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss']
})
export class ImageCarouselComponent implements OnInit {
  @Input()
  images: IImage[] = [];

  selectedImageIndex = 0;

  private readonly selectedImageSource = new ReplaySubject<IImage>(1);
  readonly selectedImage$ = this.selectedImageSource.asObservable();

  constructor(private readonly showFullImageService: ShowFullImageService) {
  }

  ngOnInit(): void {
    this.selectedImageSource.next(this.images[this.selectedImageIndex]);
  }

  changeImage(dir: number): void {
    const i = this.selectedImageIndex + dir;

    if (i < 0 || i == this.images.length) return;

    this.selectedImageIndex = i;
    this.selectedImageSource.next(this.images[i]);
  }

  selectImage(image: IImage) {
    this.showFullImageService.selectImage(image);
  }
}
