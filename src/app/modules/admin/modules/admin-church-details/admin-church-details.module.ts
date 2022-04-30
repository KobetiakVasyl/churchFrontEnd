import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminChurchDetailsRoutingModule } from './admin-church-details-routing.module';
import { AdminChurchDetailsLayoutComponent } from './shared/components/admin-church-details-layout/admin-church-details-layout.component';
import {MaterialModule} from "../../../../shared/modules/material/material.module";
import { AdminOverviewComponent } from './pages/admin-overview/admin-overview.component';
import { AdminScheduleComponent } from './pages/admin-schedule/admin-schedule.component';
import { AdminAnnouncementsComponent } from './pages/admin-announcements/admin-announcements.component';
import {ReactiveFormsModule} from "@angular/forms";
import {AdminModule} from "../../admin.module";


@NgModule({
  declarations: [
    AdminChurchDetailsLayoutComponent,
    AdminOverviewComponent,
    AdminScheduleComponent,
    AdminAnnouncementsComponent
  ],
  imports: [
    CommonModule,
    AdminChurchDetailsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    AdminModule
  ]
})
export class AdminChurchDetailsModule { }
