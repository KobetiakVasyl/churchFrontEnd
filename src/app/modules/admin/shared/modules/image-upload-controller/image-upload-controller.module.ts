import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from "../../../../../shared/modules/material/material.module";
import {ImageControllerItemComponent} from "./components/image-controller-item/image-controller-item.component";
import {ImagesUploaderComponent} from './components/images-uploader/images-uploader.component';
import {ShowFullImageModule} from "../../../../../shared/modules/show-full-image/show-full-image.module";


@NgModule({
  declarations: [
    ImageControllerItemComponent,
    ImagesUploaderComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ShowFullImageModule
  ],
  exports: [ImagesUploaderComponent]
})
export class ImageUploadControllerModule {
}
