import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ChurchDetailsLayoutComponent} from "./shared/components/church-details-layout/church-details-layout.component";
import {ChurchOverviewComponent} from "./pages/church-overview/church-overview.component";
import {ScheduleLayoutComponent} from "./pages/schedule/schedule-layout/schedule-layout.component";

const routes: Routes = [
  {
    path: ':id',
    component: ChurchDetailsLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full'
      },
      {
        path: 'overview',
        component: ChurchOverviewComponent
      },
      {
        path: 'schedule',
        component: ScheduleLayoutComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChurchDetailsRoutingModule { }
