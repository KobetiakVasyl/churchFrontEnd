import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FlexLayoutModule, FlexModule} from "@angular/flex-layout";
import {MaterialModule} from "../../shared/modules/material.module";

import {AdminLayoutComponent} from './shared/components/admin-layout/admin-layout.component';
import {EditOverviewPageComponent} from './components/edit-overview-page/edit-overview-page.component';
import {EditPilgrimagePageComponent} from './components/edit-pilgrimage-page/edit-pilgrimage-page.component';
import {EditSchedulePageComponent} from './components/edit-schedule-page/edit-schedule-page.component';
import {EditAdvertisementsPageComponent} from './components/edit-advertisements-page/edit-advertisements-page.component';
import {AdminSettingsPageComponent} from './components/admin-settings-page/admin-settings-page.component';
import { AdminAdvertisementItemPageComponent } from './components/edit-advertisement-item-page/admin-advertisement-item-page.component';
import {UploadImagesComponent} from './shared/components/upload-images/upload-images.component';
import {ScheduleModule} from '../main/modules/schedule/schedule.module';
import { CreateScheduleEventPageComponent } from './components/create-schedule-event-page/create-schedule-event-page.component';
import { AdminSimpleTableComponent } from './shared/components/admin-simple-table/admin-simple-table.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    EditOverviewPageComponent,
    EditPilgrimagePageComponent,
    EditSchedulePageComponent,
    EditAdvertisementsPageComponent,
    AdminSettingsPageComponent,
    AdminAdvertisementItemPageComponent,
    UploadImagesComponent,
    CreateScheduleEventPageComponent,
    AdminSimpleTableComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    FlexModule,
    FlexLayoutModule,
    ScheduleModule
  ]
})
export class AdminModule {
}
