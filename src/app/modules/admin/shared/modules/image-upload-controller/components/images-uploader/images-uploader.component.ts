import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IImage, IImageChangeEvent} from "../../../../../../../shared/interfaces/image.interfaces";
import {Observable, of, skipWhile, take, timer} from "rxjs";
import {HttpLoadingService} from "../../../../../../../shared/services/local/http-loading.service";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-images-uploader',
  templateUrl: './images-uploader.component.html',
  styleUrls: ['./images-uploader.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ImagesUploaderComponent,
      multi: true
    }
  ]
})
export class ImagesUploaderComponent implements ControlValueAccessor {
  isDisabled = false;
  isTouched = false;

  onTouch!: () => void;
  onChange!: (value: IImageChangeEvent) => void;

  private newlyUploadedImages: File[] = [];
  private initiallyUploadedImages: IImage[] = [];

  images: IImage[] = [];

  get showLoading$(): Observable<boolean> {
    return HttpLoadingService.showLoading$;
  }

  writeValue(value: IImage[]): void {
    this.images = value;
    this.initiallyUploadedImages = [...value];

    of(null)
      .pipe(
        skipWhile(() => !this.onChange),
        take(1)
      )
      .subscribe(() => this.onChange(this.getImageInfo()));
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.isTouched = true;
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.isDisabled = isDisabled;
  }

  handleFileUpload(value: File): void {
    const newImages = [...this.images];

    this.newlyUploadedImages.push(value);

    const fileReader = new FileReader();

    fileReader.readAsDataURL(value)

    fileReader.onloadend = () => {
      newImages.push({
        id: 0,
        name: value.name,
        url: fileReader.result as string
      });

      fileReader.onloadend = null;

      this.images = newImages;
      this.onChange(this.getImageInfo());
    };
  }

  deleteImage(value: IImage): void {
    let uploaded = [...this.newlyUploadedImages];

    let newValue: IImage[];

    if (!!value.id) {
      newValue = this.images.filter(el => el.id !== value.id);
    } else {
      newValue = this.images.filter(el => el.name !== value.name);
      uploaded = uploaded.filter(el => el.name !== value.name);
    }

    this.images = newValue;
    this.newlyUploadedImages = uploaded;
    this.onChange(this.getImageInfo());
  }

  private getImageInfo(): IImageChangeEvent {
    const removed: number[] = [];

    this.initiallyUploadedImages.forEach(el => {
      const image = this.images.find(({id}) => id === el.id);
      if (!image) removed.push(el.id);
    });

    return {
      removed,
      uploaded: this.newlyUploadedImages
    };
  }
}
