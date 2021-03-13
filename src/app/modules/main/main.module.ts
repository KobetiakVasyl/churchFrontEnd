import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule, FlexModule} from "@angular/flex-layout";

import {MainRoutingModule} from './main-routing.module';
import {MaterialModule} from "../../shared/modules/material.module";

import {AdvertisementsPageComponent} from './components/advertisements-page/advertisements-page.component';
import {PilgrimagePageComponent} from './components/pilgrimage-page/pilgrimage-page.component';
import {OverviewPageComponent} from './components/overview-page/overview-page.component';
import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component';
import {InfoCardComponent} from "./shared/components/info-card/info-card.component";
import {ChurchSelectionPageComponent} from './components/church-selection-page/church-selection-page.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    OverviewPageComponent,
    PilgrimagePageComponent,
    AdvertisementsPageComponent,
    MainLayoutComponent,
    InfoCardComponent,
    ChurchSelectionPageComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule,
    FlexModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ]
})
export class MainModule {
}
