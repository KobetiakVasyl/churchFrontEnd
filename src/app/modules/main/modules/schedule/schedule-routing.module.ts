import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {SchedulePageComponent} from "./shared/components/schedule-page/schedule-page.component";
import {DayDetailsComponent} from "./components/day-details/day-details.component";

const routes: Routes = [
  {
    path: '',
    component: SchedulePageComponent
  },
  {
    path: ':date',
    component: DayDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleRoutingModule {
}
