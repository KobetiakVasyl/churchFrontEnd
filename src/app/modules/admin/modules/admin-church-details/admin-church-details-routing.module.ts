import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  AdminChurchDetailsLayoutComponent
} from "./shared/components/admin-church-details-layout/admin-church-details-layout.component";
import {AdminOverviewComponent} from "./pages/admin-overview/admin-overview.component";

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
        loadChildren: () => import('./modules/admin-schedule/admin-schedule.module').then(m => m.AdminScheduleModule)
      },
      {
        path: 'announcements',
        loadChildren: () => import('./modules/admin-announcements/admin-announcements.module').then(m => m.AdminAnnouncementsModule)
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
