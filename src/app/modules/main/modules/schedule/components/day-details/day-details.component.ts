import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {fadeInAnimation} from '../../../../../../shared/animations';
import {CalendarEvent} from '../../../../../../shared/interfaces/shared.interfaces';

@Component({
  selector: 'app-day-details',
  templateUrl: './day-details.component.html',
  styleUrls: ['./day-details.component.scss'],
  animations: [fadeInAnimation]
})
export class DayDetailsComponent implements OnInit {
  date = 'N/A';
  events: CalendarEvent[] = [
    {
      date: '08:00',
      text: 'lorem ipsum',
      type: '',
    },
    {
      date: '12:00',
      text: 'lorem ipsum dolor amet',
      type: '',
    },
    {
      date: '18:00',
      text: 'lorem ipsumlorem ipsum lorem ipsumlorem ipsumlorem ipsum lorem ipsum',
      type: '',
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (!params.date) return;

      this.date = params.date;
    });
  }

  navigateToSchedulePage() {
    const {id} = JSON.parse(localStorage.getItem('churchInfo') as string);

    this.router.navigate(['', 'schedule', id]);
  }
}
