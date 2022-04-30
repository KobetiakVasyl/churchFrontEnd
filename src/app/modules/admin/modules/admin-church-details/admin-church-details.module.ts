import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminChurchDetailsRoutingModule } from './admin-church-details-routing.module';
import { AdminChurchDetailsLayoutComponent } from './shared/components/admin-church-details-layout/admin-church-details-layout.component';
import {MaterialModule} from "../../../../shared/modules/material/material.module";


@NgModule({
  declarations: [
    AdminChurchDetailsLayoutComponent
  ],
  imports: [
    CommonModule,
    AdminChurchDetailsRoutingModule,
    MaterialModule
  ]
})
export class AdminChurchDetailsModule { }
