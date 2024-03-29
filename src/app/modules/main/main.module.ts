import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MainRoutingModule} from './main-routing.module';
import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component';
import {SelectChurchHeaderComponent} from './pages/select-church/select-church-header/select-church-header.component';
import {SelectChurchLayoutComponent} from './pages/select-church/select-church-layout/select-church-layout.component';
import {SelectChurchItemComponent} from './pages/select-church/select-church-item/select-church-item.component';
import {MaterialModule} from "../../shared/modules/material/material.module";
import {ReactiveFormsModule} from "@angular/forms";
import {SelectChurchListComponent} from './pages/select-church/select-church-list/select-church-list.component';
import {ScrollToTopModule} from "../../shared/modules/scroll-to-top/scroll-to-top.module";
import {ShowFullImageModule} from "../../shared/modules/show-full-image/show-full-image.module";
import {InfiniteScrollModule} from "ngx-infinite-scroll";

@NgModule({
  declarations: [
    MainLayoutComponent,
    SelectChurchHeaderComponent,
    SelectChurchLayoutComponent,
    SelectChurchItemComponent,
    SelectChurchListComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    ScrollToTopModule,
    ShowFullImageModule,
    InfiniteScrollModule
  ]
})
export class MainModule {
}
