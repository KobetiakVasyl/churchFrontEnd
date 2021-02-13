import {Component, OnInit} from '@angular/core';
import {fadeInAnimation} from "../../../../../../../shared/animations";

@Component({
  selector: 'app-schedule-page',
  templateUrl: './schedule-page.component.html',
  styleUrls: ['./schedule-page.component.scss'],
  animations: [fadeInAnimation]
})
export class SchedulePageComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
