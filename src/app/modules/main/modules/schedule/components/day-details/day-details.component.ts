import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {fadeInAnimation} from "../../../../../../shared/animations";

interface DayEvent {
  information: string;
  date: string;
}

@Component({
  selector: 'app-day-details',
  templateUrl: './day-details.component.html',
  styleUrls: ['./day-details.component.scss'],
  animations: [fadeInAnimation]
})
export class DayDetailsComponent implements OnInit {
  date = 'N/A';
  events: DayEvent[] = [
    {
      date: '08:00',
      information: 'lorem ipsum',
    },
    {
      date: '12:00',
      information: 'lorem ipsum dolor amet',
    },
    {
      date: '18:00',
      information: 'lorem ipsumlorem ipsum lorem ipsumlorem ipsumlorem ipsum lorem ipsum',
    }
  ];

  constructor(
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (!params['date']) return;

      this.date = params['date'];
    });
  }
}
