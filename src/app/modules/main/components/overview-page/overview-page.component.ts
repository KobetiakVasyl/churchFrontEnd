import {Component, OnInit} from '@angular/core';
import {bounceInAnimation} from '../../../../shared/animations';
import {IChurch} from '../../../../shared/interfaces/church.interfaces';
import {ChurchService} from '../../../../shared/services/API/church.service';
import {ActivatedRoute} from '@angular/router';
import {finalize, mergeMap} from 'rxjs/operators';
import {SnackbarService} from '../../../../shared/services/local/snackbar.service';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss'],
  animations: [bounceInAnimation]
})
export class OverviewPageComponent implements OnInit {
  churchInfo!: IChurch;

  constructor(
    private readonly snackbarService: SnackbarService,
    private readonly churchService: ChurchService,
    private readonly route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    const snackbarRef = this.snackbarService.info('Завантаження інформації про церкву...', false);

    this.route.params
      .pipe(
        mergeMap(param => this.churchService
          .getById(param.id)
          .pipe(finalize(() => snackbarRef.close())))
      )
      .subscribe(
        response => this.churchInfo = response,
        () => this.snackbarService.error('Не вдалося завантажити інформацію про церкву. Переконайтеся що у вас є доступ до інтернету')
      );
  }

}
