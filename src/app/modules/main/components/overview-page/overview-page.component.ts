import {Component, OnInit} from '@angular/core';
import {bounceInAnimation} from "../../../../shared/animations";

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss'],
  animations: [bounceInAnimation]
})
export class OverviewPageComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
