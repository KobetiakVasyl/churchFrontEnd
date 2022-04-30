import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  AdminChurchDetailsLayoutComponent
} from "./shared/components/admin-church-details-layout/admin-church-details-layout.component";
import {AdminOverviewComponent} from "./pages/admin-overview/admin-overview.component";
import {AdminScheduleComponent} from "./pages/admin-schedule/admin-schedule.component";
import {AdminAnnouncementsComponent} from "./pages/admin-announcements/admin-announcements.component";

const routes: Routes = [
  {
    path: ':id',
    component: AdminChurchDetailsLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full'
      },
      {
        path: 'overview',
        component: AdminOverviewComponent
      },
      {
        path: 'schedule',
        component: AdminScheduleComponent
      },
      {
        path: 'announcements',
        component: AdminAnnouncementsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminChurchDetailsRoutingModule {
}
