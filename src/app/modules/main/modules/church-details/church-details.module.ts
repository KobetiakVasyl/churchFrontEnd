import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ChurchDetailsRoutingModule} from './church-details-routing.module';
import {ChurchDetailsLayoutComponent} from './shared/components/church-details-layout/church-details-layout.component';
import {MaterialModule} from "../../../../shared/modules/material/material.module";
import {ChurchOverviewComponent} from "./pages/church-overview/church-overview.component";
import {ScheduleLayoutComponent} from './pages/schedule/schedule-layout/schedule-layout.component';
import {ScheduleCalendarComponent} from './pages/schedule/schedule-calendar/schedule-calendar.component';
import {ReactiveFormsModule} from "@angular/forms";
import {ScheduleEventListComponent} from './pages/schedule/schedule-event-list/schedule-event-list.component';
import {
  ScheduleEventListItemComponent
} from './pages/schedule/schedule-event-list-item/schedule-event-list-item.component';
import {ScrollToTopModule} from "../../../../shared/modules/scroll-to-top/scroll-to-top.module";
import {AnnouncementsLayoutComponent} from './pages/announcements/announcements-layout/announcements-layout.component';
import {AnnouncementListComponent} from './pages/announcements/announcement-list/announcement-list.component';
import {
  AnnouncementListItemComponent
} from './pages/announcements/announcement-list-item/announcement-list-item.component';
import {AnnouncementHeaderComponent} from './pages/announcements/announcement-header/announcement-header.component';
import {ImageCarouselModule} from "../../../../shared/modules/image-carousel/image-carousel.module";
import {InfiniteScrollModule} from "ngx-infinite-scroll";


@NgModule({
  declarations: [
    ChurchDetailsLayoutComponent,
    ChurchOverviewComponent,
    ScheduleLayoutComponent,
    ScheduleCalendarComponent,
    ScheduleEventListComponent,
    ScheduleEventListItemComponent,
    AnnouncementsLayoutComponent,
    AnnouncementListComponent,
    AnnouncementListItemComponent,
    AnnouncementHeaderComponent,
  ],
    imports: [
        CommonModule,
        ChurchDetailsRoutingModule,
        MaterialModule,
        ReactiveFormsModule,
        ScrollToTopModule,
        ImageCarouselModule,
        InfiniteScrollModule
    ]
})
export class ChurchDetailsModule {
}
