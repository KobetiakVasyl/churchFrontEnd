import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainLayoutComponent} from "./shared/components/main-layout/main-layout.component";
import {SelectChurchLayoutComponent} from "./pages/select-church/select-church-layout/select-church-layout.component";

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
        path: 'church-details',
        loadChildren: () => import('./modules/church-details/church-details.module').then(m => m.ChurchDetailsModule)
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
