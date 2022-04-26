import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {AdminLayoutComponent} from './shared/components/admin-layout/admin-layout.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../shared/modules/material/material.module";
import {ShowFullImageModule} from "../../shared/modules/show-full-image/show-full-image.module";
import { AdminSelectActionComponent } from './pages/admin-select-action/admin-select-action.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    AdminSelectActionComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    ShowFullImageModule
  ]
})
export class AdminModule {
}
