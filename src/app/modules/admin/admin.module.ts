import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {AdminLayoutComponent} from './shared/components/admin-layout/admin-layout.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../shared/modules/material/material.module";
import {ShowFullImageModule} from "../../shared/modules/show-full-image/show-full-image.module";
import {AdminSelectActionComponent} from './pages/admin-select-action/admin-select-action.component';
import { AdminSelectChurchHeaderComponent } from './pages/admin-select-church/admin-select-church-header/admin-select-church-header.component';
import { AdminSelectChurchListComponent } from './pages/admin-select-church/admin-select-church-list/admin-select-church-list.component';
import { AdminSelectChurchItemComponent } from './pages/admin-select-church/admin-select-church-item/admin-select-church-item.component';
import { AdminSelectChurchLayoutComponent } from './pages/admin-select-church/admin-select-church-layout/admin-select-church-layout.component';
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {ScrollToTopModule} from "../../shared/modules/scroll-to-top/scroll-to-top.module";

@NgModule({
  declarations: [
    AdminLayoutComponent,
    AdminSelectActionComponent,
    AdminSelectChurchHeaderComponent,
    AdminSelectChurchListComponent,
    AdminSelectChurchItemComponent,
    AdminSelectChurchLayoutComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    ShowFullImageModule,
    InfiniteScrollModule,
    ScrollToTopModule
  ]
})
export class AdminModule {
}
