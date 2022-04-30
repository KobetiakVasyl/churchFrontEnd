import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IImage} from "../../../../../shared/interfaces/image.interfaces";
import {ShowFullImageService} from "../../../../../shared/modules/show-full-image/show-full-image.service";

@Component({
  selector: 'app-image-controller',
  templateUrl: './image-controller.component.html',
  styleUrls: ['./image-controller.component.scss']
})
export class ImageControllerComponent {
  @Input() image!: IImage;

  @Output('download') downloadEventEmitter = new EventEmitter<string>();
  @Output('delete') deleteEventEmitter = new EventEmitter<number>();

  constructor(private readonly showFullImageService: ShowFullImageService) {
  }

  selectImage(image: IImage): void {
    this.showFullImageService.selectImage(image);
  }
}
