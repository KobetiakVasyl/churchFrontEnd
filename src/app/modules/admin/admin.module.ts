import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FlexLayoutModule, FlexModule} from "@angular/flex-layout";
import {MaterialModule} from "../../shared/modules/material.module";

import {AdminLayoutComponent} from './shared/components/admin-layout/admin-layout.component';
import {EditOverviewPageComponent} from './components/edit-overview-page/edit-overview-page.component';
import {EditPilgrimagePageComponent} from './components/edit-pilgrimage-page/edit-pilgrimage-page.component';
import {EditShedulePageComponent} from './components/edit-shedule-page/edit-shedule-page.component';
import {EditAdvertisementsPageComponent} from './components/edit-advertisements-page/edit-advertisements-page.component';
import {AdminSettingsPageComponent} from './components/admin-settings-page/admin-settings-page.component';
import {QuillModule} from "ngx-quill";
import { EditAdvertisementItemPageComponent } from './components/edit-advertisement-item-page/edit-advertisement-item-page.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    EditOverviewPageComponent,
    EditPilgrimagePageComponent,
    EditShedulePageComponent,
    EditAdvertisementsPageComponent,
    AdminSettingsPageComponent,
    EditAdvertisementItemPageComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    FlexModule,
    FlexLayoutModule,
    QuillModule
  ]
})
export class AdminModule {
}
