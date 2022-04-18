import {Component, OnInit} from '@angular/core';
import {ErrorMessageService} from "../../../../shared/services/local/error-message.service";
import {ActivatedRoute} from "@angular/router";
import {ChurchService} from "../../../../shared/services/API/church.service";
import {catchError, Observable, switchMap, tap, throwError} from "rxjs";
import {HttpLoadingService} from "../../../../shared/services/local/http-loading.service";
import {IChurch} from "../../../../shared/interfaces/church.interfaces";
import {MainTransferDataService} from "../../shared/services/main-transfer-data.service";

@Component({
  selector: 'app-church-overview',
  templateUrl: './church-overview.component.html',
  styleUrls: ['./church-overview.component.scss'],
  providers: [ErrorMessageService]
})
export class ChurchOverviewComponent implements OnInit {
  churchInfo$!: Observable<IChurch>;

  constructor(
    private readonly mainTransferDataService: MainTransferDataService,
    readonly errorMessageService: ErrorMessageService,
    private readonly churchService: ChurchService,
    private readonly route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.mainTransferDataService.changeToolbarTitle('Church details');

    this.churchInfo$ = this.route.params
      .pipe(
        tap(() => this.errorMessageService.hideErrorMessage()),
        switchMap(params => this.churchService.getById(params['id'])),
        catchError(error => {
          this.errorMessageService.errorMessage = error.message;
          this.errorMessageService.showErrorMessage();

          return throwError(error);
        })
      );
  }

  get showLoading(): Observable<boolean> {
    return HttpLoadingService.showLoading$;
  }
}
