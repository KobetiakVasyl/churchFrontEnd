import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminChurchDetailsRoutingModule} from './admin-church-details-routing.module';
import {
  AdminChurchDetailsLayoutComponent
} from './shared/components/admin-church-details-layout/admin-church-details-layout.component';
import {MaterialModule} from "../../../../shared/modules/material/material.module";
import {AdminOverviewComponent} from './pages/admin-overview/admin-overview.component';
import {ReactiveFormsModule} from "@angular/forms";
import {AdminModule} from "../../admin.module";
import {ImageUploadControllerModule} from "../../shared/modules/image-upload-controller/image-upload-controller.module";

@NgModule({
  declarations: [
    AdminChurchDetailsLayoutComponent,
    AdminOverviewComponent,
  ],
  imports: [
    CommonModule,
    AdminChurchDetailsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    AdminModule,
    ImageUploadControllerModule
  ]
})
export class AdminChurchDetailsModule {
}
