import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {debounceTime, distinctUntilChanged, Observable, Subscription} from "rxjs";
import {HttpLoadingService} from "../../../../../shared/services/local/http-loading.service";
import {AdminSelectChurchService} from "../../../shared/services/admin-select-church.service";

@Component({
  selector: 'app-admin-select-church-header',
  templateUrl: './admin-select-church-header.component.html',
  styleUrls: ['./admin-select-church-header.component.scss']
})
export class AdminSelectChurchHeaderComponent implements OnInit, OnDestroy {
  readonly filterFormControl = new FormControl(null);
  private readonly subscriptions = new Subscription();

  constructor(private readonly adminSelectChurchService: AdminSelectChurchService) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.filterFormControl.valueChanges
        .pipe(
          debounceTime(500),
          distinctUntilChanged()
        )
        .subscribe(value => this.adminSelectChurchService.changeFilter(value))
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  get showLoading$(): Observable<boolean> {
    return HttpLoadingService.showLoading$;
  }
}
