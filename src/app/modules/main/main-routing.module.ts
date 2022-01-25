import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ChurchSelectionPageComponent} from './components/church-selection-page/church-selection-page.component';
import {AdvertisementsPageComponent} from './components/advertisements-page/advertisements-page.component';
import {PilgrimagePageComponent} from './components/pilgrimage-page/pilgrimage-page.component';
import {OverviewPageComponent} from './components/overview-page/overview-page.component';
import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component';
import {CanActivateChurchInfoGuard} from '../../shared/guards/can-activate-church-info.guard';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'church-selection',
        component: ChurchSelectionPageComponent
      },
      {
        path: 'overview/:id',
        component: OverviewPageComponent,
        canActivate: [CanActivateChurchInfoGuard]
      },
      // {
      //   path: 'pilgrimage/:id',
      //   component: PilgrimagePageComponent,
      //   canActivate: [CanActivateChurchInfoGuard]
      // },
      {
        path: 'advertisements/:id',
        component: AdvertisementsPageComponent,
        canActivate: [CanActivateChurchInfoGuard]
      },
      {
        path: 'schedule/:id',
        loadChildren: () => import('./modules/schedule/schedule.module').then(m => m.ScheduleModule),
        data: {editEnabled: false},
        canActivate: [CanActivateChurchInfoGuard]
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
