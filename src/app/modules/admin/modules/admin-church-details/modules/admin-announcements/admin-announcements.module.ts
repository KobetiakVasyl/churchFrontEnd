import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminAnnouncementsRoutingModule} from './admin-announcements-routing.module';
import {
  AdminAnnouncementsLayoutComponent
} from './shared/components/admin-announcements-layout/admin-announcements-layout.component';
import {MaterialModule} from "../../../../../../shared/modules/material/material.module";
import {ReactiveFormsModule} from "@angular/forms";
import {
  AdminAnnouncementsListLayoutComponent
} from './pages/admin-announcements/admin-announcements-list-layout/admin-announcements-list-layout.component';
import {
  AdminAnnouncementsListComponent
} from "./pages/admin-announcements/admin-announcements-list/admin-announcements-list.component";
import {
  AdminAnnouncementsListItemComponent
} from "./pages/admin-announcements/admin-announcements-list-item/admin-announcements-list-item.component";
import {
  AdminAnnouncementsHeaderComponent
} from "./pages/admin-announcements/admin-announcements-header/admin-announcements-header.component";
import { AdminEditCreateAnnouncementComponent } from './pages/admin-edit-create-announcement/admin-edit-create-announcement.component';
import {ImageUploadControllerModule} from "../../../../shared/modules/image-upload-controller/image-upload-controller.module";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {ScrollToTopModule} from "../../../../../../shared/modules/scroll-to-top/scroll-to-top.module";
import {ImageCarouselModule} from "../../../../../../shared/modules/image-carousel/image-carousel.module";


@NgModule({
  declarations: [
    AdminAnnouncementsLayoutComponent,
    AdminAnnouncementsListLayoutComponent,
    AdminAnnouncementsListComponent,
    AdminAnnouncementsListItemComponent,
    AdminAnnouncementsHeaderComponent,
    AdminEditCreateAnnouncementComponent
  ],
  imports: [
    CommonModule,
    AdminAnnouncementsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    ImageUploadControllerModule,
    InfiniteScrollModule,
    ScrollToTopModule,
    ImageCarouselModule,
  ]
})
export class AdminAnnouncementsModule {
}
