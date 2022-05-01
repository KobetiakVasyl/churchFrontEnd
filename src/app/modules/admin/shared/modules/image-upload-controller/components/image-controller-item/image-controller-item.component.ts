import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IImage} from "../../../../../../../shared/interfaces/image.interfaces";
import {ShowFullImageService} from "../../../../../../../shared/modules/show-full-image/show-full-image.service";

@Component({
  selector: 'app-image-controller-item',
  templateUrl: './image-controller-item.component.html',
  styleUrls: ['./image-controller-item.component.scss']
})
export class ImageControllerItemComponent {
  @Input() image!: IImage;

  @Output('delete') deleteEventEmitter = new EventEmitter<IImage>();

  constructor(private readonly showFullImageService: ShowFullImageService) {
  }

  selectImage(image: IImage): void {
    this.showFullImageService.selectImage(image);
  }
}
