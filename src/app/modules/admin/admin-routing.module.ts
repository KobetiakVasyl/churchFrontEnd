import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AdminLayoutComponent} from './shared/components/admin-layout/admin-layout.component';
import {AdminSettingsPageComponent} from './components/admin-settings-page/admin-settings-page.component';
import {EditSchedulePageComponent} from './components/edit-schedule-page/edit-schedule-page.component';
import {EditOverviewPageComponent} from './components/edit-overview-page/edit-overview-page.component';
import {CreateScheduleEventPageComponent} from './components/create-schedule-event-page/create-schedule-event-page.component';
import {CreateChurchPageComponent} from './components/create-church-page/create-church-page.component';
import {AdminAdvertisementsPageComponent} from './components/admin-advertisements-page/admin-advertisements-page.component';
import {ChurchSelectionPageComponent} from '../main/components/church-selection-page/church-selection-page.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'church-selection',
        component: ChurchSelectionPageComponent,
        data: {openedFromAdminPanel: true}
      },
      {
        path: 'overview/:id',
        component: EditOverviewPageComponent
      },
      {
        path: 'church/create',
        component: CreateChurchPageComponent
      },
      {
        path: 'advertisements/:id',
        component: AdminAdvertisementsPageComponent
      },
      {
        path: 'schedule/:id',
        component: EditSchedulePageComponent
      },
      {
        path: 'schedule/create',
        component: CreateScheduleEventPageComponent,
        data: {editEnabled: true}
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
