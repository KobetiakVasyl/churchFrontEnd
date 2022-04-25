import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowFullImageComponent } from './show-full-image.component';
import {MaterialModule} from "../material/material.module";



@NgModule({
  declarations: [ShowFullImageComponent],
  exports: [
    ShowFullImageComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class ShowFullImageModule { }
