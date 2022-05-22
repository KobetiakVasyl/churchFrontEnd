import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  AdminAnnouncementsLayoutComponent
} from "./shared/components/admin-announcements-layout/admin-announcements-layout.component";
import {
  AdminAnnouncementsListLayoutComponent
} from "./pages/admin-announcements/admin-announcements-list-layout/admin-announcements-list-layout.component";
import {
  AdminEditCreateAnnouncementComponent
} from "./pages/admin-edit-create-announcement/admin-edit-create-announcement.component";

const routes: Routes = [
  {
    path: '',
    component: AdminAnnouncementsLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: AdminAnnouncementsListLayoutComponent
      },
      {
        path: 'edit/:announcementId',
        component: AdminEditCreateAnnouncementComponent,
        data: {
          formTitle: 'Edit announcement'
        }
      },
      {
        path: 'create',
        component: AdminEditCreateAnnouncementComponent,
        data: {
          formTitle: 'Create announcement'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminAnnouncementsRoutingModule {
}
