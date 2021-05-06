import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ScheduleRoutingModule} from "./schedule-routing.module";
import {MatIconModule} from "@angular/material/icon";

import {SchedulePageComponent} from './shared/components/schedule-page/schedule-page.component';
import {DateSelectorComponent} from './components/date-selector/date-selector.component';
import {CalendarComponent} from './components/calendar/calendar.component';
import {DayDetailsComponent} from './components/day-details/day-details.component';

import {DayjsPipe} from './shared/pipes/dayjs.pipe';
import {MaterialModule} from "../../../../shared/modules/material.module";
import {FlexModule} from "@angular/flex-layout";


@NgModule({
  declarations: [
    SchedulePageComponent,
    DateSelectorComponent,
    CalendarComponent,
    DayDetailsComponent,
    DayjsPipe
  ],
  exports: [
    SchedulePageComponent
  ],
  imports: [
    CommonModule,
    ScheduleRoutingModule,
    MaterialModule,
    FlexModule
  ]
})
export class ScheduleModule {
}
