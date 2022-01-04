import {Component, ElementRef, forwardRef, Input, ViewChild} from '@angular/core';
import {FileService} from '../../services/file.service';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {ViewImageShowFullService} from '../../../../../shared/services/local/view-image-show-full.service';
import {IChurchImage} from '../../../../../shared/interfaces/church.interfaces';

@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UploadImagesComponent),
      multi: true
    }
  ]
})
export class UploadImagesComponent implements ControlValueAccessor {
  @ViewChild('fileInput', {static: false}) fileInput!: ElementRef;

  onTouched: any = () => {
  };
  onChange: any = () => {
  };

  images: File[] | null | any = null;
  uploadedImages: IChurchImage[] = [];
  notUploadedImages: IChurchImage[] = [];

  isDisabled = false;

  constructor(
    private readonly viewImageShowFullService: ViewImageShowFullService,
    private readonly fileService: FileService
  ) {
  }

  writeValue(images: any): void {
    this.images = images;

    if (Array.isArray(images)) {
      this.uploadedImages = images.filter((image: IChurchImage) => image.hasOwnProperty('id'));
      this.notUploadedImages = images.filter((image: IChurchImage) => !image.hasOwnProperty('id'));
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.isDisabled = isDisabled;
  }

  handleRemoveFile(i: number): void {
    if (this.isDisabled) {
      return;
    }

    this.images?.splice(i, 1);

    this.onTouched();
    this.writeValue(this.images);
    this.onChange(this.images);
  }

  openFileSelection(): void {
    if (this.isDisabled) {
      return;
    }

    this.fileInput.nativeElement.value = null;
    this.fileInput.nativeElement.click();
    this.onTouched();
  }

  handleAddImage(files: FileList): void {
    this.onTouched();

    const file = files.item(0);

    if (!file) {
      return;
    }

    const canImageBeUploaded = this.fileService.isImageExtensionAllowed(file.name);

    if (!canImageBeUploaded) {
      return;
    }

    const value = !!this.images
      ? [...this.images, file]
      : [file];

    this.writeValue(value);
    this.onChange(value);
  }

  handleImageSelect(image: any) {
    this.viewImageShowFullService.selectImage({src: image.url, alt: 'Image'});
  }
}
