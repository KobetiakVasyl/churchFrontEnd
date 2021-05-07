import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SingleImageViewerComponent} from './single-image-viewer.component';
import {MaterialModule} from '../material.module';
import {FlexModule} from '@angular/flex-layout';


@NgModule({
  declarations: [SingleImageViewerComponent],
  exports: [
    SingleImageViewerComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexModule,
  ]
})
export class SingleImageViewerModule {
}
