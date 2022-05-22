import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminScheduleRoutingModule } from './admin-schedule-routing.module';
import { AdminScheduleLayoutComponent } from './shared/components/admin-schedule-layout/admin-schedule-layout.component';
import { AdminEditCreateScheduleComponent } from './pages/admin-edit-create-schedule/admin-edit-create-schedule.component';
import { AdminScheduleHeaderComponent } from './pages/admin-schedule/admin-schedule-header/admin-schedule-header.component';
import { AdminScheduleListComponent } from './pages/admin-schedule/admin-schedule-list/admin-schedule-list.component';
import { AdminScheduleListItemComponent } from './pages/admin-schedule/admin-schedule-list-item/admin-schedule-list-item.component';
import { AdminScheduleListLayoutComponent } from './pages/admin-schedule/admin-schedule-list-layout/admin-schedule-list-layout.component';
import {MaterialModule} from "../../../../../../shared/modules/material/material.module";
import {ReactiveFormsModule} from "@angular/forms";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {ScrollToTopModule} from "../../../../../../shared/modules/scroll-to-top/scroll-to-top.module";


@NgModule({
  declarations: [
    AdminScheduleLayoutComponent,
    AdminEditCreateScheduleComponent,
    AdminScheduleHeaderComponent,
    AdminScheduleListComponent,
    AdminScheduleListItemComponent,
    AdminScheduleListLayoutComponent
  ],
  imports: [
    CommonModule,
    AdminScheduleRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    ScrollToTopModule
  ]
})
export class AdminScheduleModule { }
