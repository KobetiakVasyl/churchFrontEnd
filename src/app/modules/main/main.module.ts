import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexModule} from "@angular/flex-layout";

import {MainRoutingModule} from './main-routing.module';
import {MaterialModule} from "../../shared/modules/material.module";

import {AdvertisementsPageComponent} from './components/advertisements-page/advertisements-page.component';
import {PilgrimagePageComponent} from './components/pilgrimage-page/pilgrimage-page.component';
import {OverviewPageComponent} from './components/overview-page/overview-page.component';
import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component';
import {InfoCardComponent} from "./shared/components/info-card/info-card.component";


@NgModule({
  declarations: [
    OverviewPageComponent,
    PilgrimagePageComponent,
    AdvertisementsPageComponent,
    MainLayoutComponent,
    InfoCardComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule,
    FlexModule
  ]
})
export class MainModule {
}
