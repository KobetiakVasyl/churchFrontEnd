import {Component} from '@angular/core';
import {ShowFullImageService} from "./show-full-image.service";

@Component({
  selector: 'app-show-full-image',
  templateUrl: './show-full-image.component.html',
  styleUrls: ['./show-full-image.component.scss']
})
export class ShowFullImageComponent {
  constructor(public readonly showFullImageService: ShowFullImageService) {
  }

  close(): void {
    this.showFullImageService.selectImage(null)
  }
}
