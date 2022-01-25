import {Component, OnInit} from '@angular/core';
import {AdvertisementCardInfo} from '../../../../shared/interfaces/shared.interfaces';
import {SnackbarService} from '../../../../shared/services/local/snackbar.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-pilgrimage-page',
  templateUrl: './pilgrimage-page.component.html',
  styleUrls: ['./pilgrimage-page.component.scss']
})
export class PilgrimagePageComponent implements OnInit {
  pilgrimages: AdvertisementCardInfo[] = [];

  constructor(
    private readonly snackbarService: SnackbarService,
    private readonly route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {

  }
}
