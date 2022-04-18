import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainLayoutComponent} from "./shared/components/main-layout/main-layout.component";
import {SelectChurchLayoutComponent} from "./pages/select-church/select-church-layout/select-church-layout.component";
import {ChurchOverviewComponent} from "./pages/church-overview/church-overview.component";

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'select-church',
        component: SelectChurchLayoutComponent
      },
      {
        path: 'overview/:id',
        component: ChurchOverviewComponent
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
