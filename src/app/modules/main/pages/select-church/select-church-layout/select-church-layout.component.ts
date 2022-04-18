import { Component, OnInit } from '@angular/core';
import {MainTransferDataService} from "../../../shared/services/main-transfer-data.service";
import {Observable} from "rxjs";
import {HttpLoadingService} from "../../../../../shared/services/local/http-loading.service";

@Component({
  selector: 'app-select-church-layout',
  templateUrl: './select-church-layout.component.html',
  styleUrls: ['./select-church-layout.component.scss']
})
export class SelectChurchLayoutComponent implements OnInit {

  constructor(private readonly mainTransferDataService: MainTransferDataService) { }

  ngOnInit(): void {
    this.mainTransferDataService.changeToolbarTitle('select church');
  }
}
