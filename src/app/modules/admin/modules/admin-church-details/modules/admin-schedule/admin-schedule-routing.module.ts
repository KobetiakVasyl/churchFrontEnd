import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminScheduleLayoutComponent} from "./shared/components/admin-schedule-layout/admin-schedule-layout.component";
import {
  AdminScheduleListLayoutComponent
} from "./pages/admin-schedule/admin-schedule-list-layout/admin-schedule-list-layout.component";
import {
  AdminEditCreateScheduleComponent
} from "./pages/admin-edit-create-schedule/admin-edit-create-schedule.component";

const routes: Routes = [
  {
    path: '',
    component: AdminScheduleLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: AdminScheduleListLayoutComponent
      },
      {
        path: 'edit/:scheduleEventId',
        component: AdminEditCreateScheduleComponent,
        data: {
          formTitle: 'Edit schedule'
        }
      },
      {
        path: 'create',
        component: AdminEditCreateScheduleComponent,
        data: {
          formTitle: 'Create schedule'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminScheduleRoutingModule { }
