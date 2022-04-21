import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ScrollToTopComponent} from './scroll-to-top.component';
import {MaterialModule} from "../material/material.module";

@NgModule({
  declarations: [ScrollToTopComponent],
  exports: [ScrollToTopComponent],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class ScrollToTopModule {
}
