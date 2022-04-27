import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminLayoutComponent} from "./shared/components/admin-layout/admin-layout.component";
import {AdminSelectActionComponent} from "./pages/admin-select-action/admin-select-action.component";
import {
  AdminSelectChurchLayoutComponent
} from "./pages/admin-select-church/admin-select-church-layout/admin-select-church-layout.component";

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [

      {
        path: '',
        component: AdminSelectActionComponent
      },
      {
        path: 'church/list',
        component: AdminSelectChurchLayoutComponent
      },
      {
        path: 'church/details/:id',
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
