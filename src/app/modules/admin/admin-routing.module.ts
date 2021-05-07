import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AdminLayoutComponent} from "./shared/components/admin-layout/admin-layout.component";
import {AdminSettingsPageComponent} from "./components/admin-settings-page/admin-settings-page.component";
import {EditSchedulePageComponent} from "./components/edit-schedule-page/edit-schedule-page.component";
import {EditPilgrimagePageComponent} from "./components/edit-pilgrimage-page/edit-pilgrimage-page.component";
import {EditAdvertisementsPageComponent} from "./components/edit-advertisements-page/edit-advertisements-page.component";
import {EditOverviewPageComponent} from "./components/edit-overview-page/edit-overview-page.component";
import {AdminAdvertisementItemPageComponent} from "./components/edit-advertisement-item-page/admin-advertisement-item-page.component";
import {CreateScheduleEventPageComponent} from './components/create-schedule-event-page/create-schedule-event-page.component';

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
        path: 'advertisements/edit/:id',
        component: AdminAdvertisementItemPageComponent,
        data: {title: 'Редагувати'}
      },
      {
        path: 'advertisements/create',
        component: AdminAdvertisementItemPageComponent,
        data: {title: 'Створити'}
      },
      {
        path: 'pilgrimage',
        component: EditPilgrimagePageComponent
      },
      {
        path: 'pilgrimage/edit/:id',
        component: AdminAdvertisementItemPageComponent,
        data: {title: 'Редагувати'}
      },
      {
        path: 'pilgrimage/create',
        component: AdminAdvertisementItemPageComponent,
        data: {title: 'Створити'}
      },
      {
        path: 'schedule',
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
