import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChurchDetailsRoutingModule } from './church-details-routing.module';
import { ChurchDetailsLayoutComponent } from './shared/components/church-details-layout/church-details-layout.component';
import {MaterialModule} from "../../../../shared/modules/material/material.module";
import {ChurchOverviewComponent} from "./pages/church-overview/church-overview.component";
import { ScheduleLayoutComponent } from './pages/schedule/schedule-layout/schedule-layout.component';
import { ScheduleCalendarComponent } from './pages/schedule/schedule-calendar/schedule-calendar.component';
import { ScheduleEventDetailsComponent } from './pages/schedule/schedule-event-details/schedule-event-details.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ChurchDetailsLayoutComponent,
    ChurchOverviewComponent,
    ScheduleLayoutComponent,
    ScheduleCalendarComponent,
    ScheduleEventDetailsComponent,
  ],
  imports: [
    CommonModule,
    ChurchDetailsRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class ChurchDetailsModule { }
