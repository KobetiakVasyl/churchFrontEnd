import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-church-details-layout',
  templateUrl: './church-details-layout.component.html',
  styleUrls: ['./church-details-layout.component.scss']
})
export class ChurchDetailsLayoutComponent {
  constructor(readonly route: ActivatedRoute) {
  }
}
