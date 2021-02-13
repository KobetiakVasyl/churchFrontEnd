import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AdvertisementsPageComponent} from "./components/advertisements-page/advertisements-page.component";
import {PilgrimagePageComponent} from "./components/pilgrimage-page/pilgrimage-page.component";
import {OverviewPageComponent} from "./components/overview-page/overview-page.component";
import {MainLayoutComponent} from "./shared/components/main-layout/main-layout.component";

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'overview',
        component: OverviewPageComponent
      },
      {
        path: 'pilgrimage',
        component: PilgrimagePageComponent
      },
      {
        path: 'advertisements',
        component: AdvertisementsPageComponent
      },
      {
        path: 'schedule',
        loadChildren: () => import('./modules/schedule/schedule.module').then(m => m.ScheduleModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
