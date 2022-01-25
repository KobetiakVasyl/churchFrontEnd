import {Component, OnInit} from '@angular/core';
import {AdvertisementCardInfo} from '../../../../shared/interfaces/shared.interfaces';
import {ViewImageShowFullService} from '../../../../shared/services/local/view-image-show-full.service';
import {IImage} from '../../../../shared/interfaces/shared.interfaces';
import {AdvertisementsService} from '../../../../shared/services/API/advertisements.service';
import {ActivatedRoute} from '@angular/router';
import {filter, finalize, map, mergeMap} from 'rxjs/operators';
import {IChurch} from '../../../../shared/interfaces/church.interfaces';
import {SnackbarService} from '../../../../shared/services/local/snackbar.service';
import {addMonths} from 'date-fns';
import {IAnnouncement} from '../../../../shared/interfaces/announcements.interfaces';

@Component({
  selector: 'app-advertisements-page',
  templateUrl: './advertisements-page.component.html',
  styleUrls: ['./advertisements-page.component.scss']
})
export class AdvertisementsPageComponent implements OnInit {
  churchInfo!: Partial<IChurch>;

  announcements: IAnnouncement[] = [];

  constructor(
    private readonly advertisementsService: AdvertisementsService,
    private readonly snackbarService: SnackbarService,
    private readonly route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.churchInfo = JSON.parse(localStorage.getItem('churchInfo') as string);

    const snackbarRef = this.snackbarService.info('Завантаження інформації про оголошення...', false);

    const currentDate = new Date();
    const lastWeekDate = addMonths(new Date(), -1);

    this.route.params
      .pipe(
        mergeMap(param => this.advertisementsService
          .getAll(param.id, currentDate, lastWeekDate, 50, 0)
          .pipe(finalize(() => snackbarRef.close()))),
        filter(response => !!response)
      )
      .subscribe(
        response => this.announcements = response,
        () => this.snackbarService.error('Не вдалося завантажити інформацію про оголошення. Переконайтеся що у вас є доступ до інтернету')
      );
  }
}
