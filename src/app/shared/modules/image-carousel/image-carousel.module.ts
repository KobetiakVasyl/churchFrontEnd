import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCarouselComponent } from './image-carousel.component';
import {MaterialModule} from "../material/material.module";



@NgModule({
    declarations: [
        ImageCarouselComponent
    ],
    exports: [
        ImageCarouselComponent
    ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class ImageCarouselModule { }
