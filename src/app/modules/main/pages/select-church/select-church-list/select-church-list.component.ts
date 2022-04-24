import {Component, OnDestroy, OnInit} from '@angular/core';
import {SelectChurchService} from "../../../shared/services/select-church.service";
import {ChurchService} from "../../../../../shared/services/API/church.service";
import {Subscription} from "rxjs";
import {ErrorMessageService} from "../../../../../shared/services/local/error-message.service";
import {IChurchListItem} from "../../../../../shared/interfaces/church.interfaces";

@Component({
  selector: 'app-select-church-list',
  templateUrl: './select-church-list.component.html',
  styleUrls: ['./select-church-list.component.scss'],
  providers: [ErrorMessageService]
})
export class SelectChurchListComponent implements OnInit, OnDestroy {
  churchList: IChurchListItem[] = [];

  private readonly subscriptions = new Subscription();

  constructor(
    private readonly selectChurchService: SelectChurchService,
    readonly errorMessageService: ErrorMessageService,
    private readonly churchService: ChurchService
  ) {
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.selectChurchService.filter$
        .subscribe(this.loadList.bind(this))
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadList(): void {
    this.errorMessageService.hideErrorMessage();

    this.churchService.search(this.selectChurchService.filter$.value).subscribe({
      next: value => this.churchList = value,
      error: error => {
        this.errorMessageService.errorMessage = error.message;
        this.errorMessageService.showErrorMessage()
      }
    })
  }
}
