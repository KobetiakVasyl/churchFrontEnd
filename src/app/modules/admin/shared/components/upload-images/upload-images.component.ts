import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {CardImage} from '../../../../../shared/interfaces/shared.interfaces';
import {FileService} from '../../services/file.service';

@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.scss']
})
export class UploadImagesComponent {
  @Input() images: CardImage[] = [];
  @Input() canEdit = false;
  @Input() maxImagesLength = 5;

  @ViewChild('fileInput', {static: false}) fileInput!: ElementRef;

  constructor(private fileService: FileService) {
  }

  remove(i: number): void {
    this.images.splice(i, 1);
  }

  openFileSelection(): void {
    if (this.maxImagesLength === this.images.length) return;

    this.fileInput.nativeElement.value = null;
    this.fileInput.nativeElement.click();
  }

  handleAddImage(event: Event): void {
    // @ts-ignore
    const file = event.target.files.item(0);

    if (!file) return;

    const canImageBeUploaded = this.fileService.isImageExtensionAllowed(file.name);

    if (!canImageBeUploaded) return;

    //   TODO: API call on upload image
    this.images.push({
      src: file.name,
      alt: ''
    });
  }
}
