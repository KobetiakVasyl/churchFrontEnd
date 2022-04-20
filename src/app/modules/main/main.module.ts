import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MainRoutingModule} from './main-routing.module';
import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component';
import {SelectChurchHeaderComponent} from './pages/select-church/select-church-header/select-church-header.component';
import {SelectChurchLayoutComponent} from './pages/select-church/select-church-layout/select-church-layout.component';
import {SelectChurchItemComponent} from './pages/select-church/select-church-item/select-church-item.component';
import {MaterialModule} from "../../shared/modules/material/material.module";
import {ReactiveFormsModule} from "@angular/forms";
import {SelectChurchListComponent} from './pages/select-church/select-church-list/select-church-list.component';

@NgModule({
    declarations: [
        MainLayoutComponent,
        SelectChurchHeaderComponent,
        SelectChurchLayoutComponent,
        SelectChurchItemComponent,
        SelectChurchListComponent
    ],
    exports: [
        SelectChurchItemComponent
    ],
    imports: [
        CommonModule,
        MainRoutingModule,
        MaterialModule,
        ReactiveFormsModule
    ]
})
export class MainModule {
}
