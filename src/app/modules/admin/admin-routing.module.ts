import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AdminLayoutComponent} from "./shared/components/admin-layout/admin-layout.component";
import {AdminSettingsPageComponent} from "./components/admin-settings-page/admin-settings-page.component";
import {EditSchedulePageComponent} from "./components/edit-schedule-page/edit-schedule-page.component";
import {EditPilgrimagePageComponent} from "./components/edit-pilgrimage-page/edit-pilgrimage-page.component";
import {EditAdvertisementsPageComponent} from "./components/edit-advertisements-page/edit-advertisements-page.component";
import {EditOverviewPageComponent} from "./components/edit-overview-page/edit-overview-page.component";
import {EditAdvertisementItemPageComponent} from "./components/edit-advertisement-item-page/edit-advertisement-item-page.component";

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'overview',
        component: EditOverviewPageComponent
      },
      {
        path: 'advertisements',
        component: EditAdvertisementsPageComponent
      },
      {
        path: 'advertisements/:id',
        component: EditAdvertisementItemPageComponent
      },
      {
        path: 'pilgrimage',
        component: EditPilgrimagePageComponent
      },
      {
        path: 'schedule',
        component: EditSchedulePageComponent
      },
      {
        path: 'settings',
        component: AdminSettingsPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
