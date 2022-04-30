import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  AdminChurchDetailsLayoutComponent
} from "./shared/components/admin-church-details-layout/admin-church-details-layout.component";

const routes: Routes = [
  {
    path: '',
    component: AdminChurchDetailsLayoutComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminChurchDetailsRoutingModule {
}
