import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {debounceTime, distinctUntilChanged, Subscription} from "rxjs";
import {SelectChurchService} from "../../../shared/services/select-church.service";

@Component({
  selector: 'app-select-church-header',
  templateUrl: './select-church-header.component.html',
  styleUrls: ['./select-church-header.component.scss']
})
export class SelectChurchHeaderComponent implements OnInit, OnDestroy {
  filterFormControl = new FormControl(null);

  private readonly subscriptions = new Subscription();

  constructor(private readonly selectChurchService: SelectChurchService) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.filterFormControl.valueChanges
        .pipe(
          debounceTime(500),
          distinctUntilChanged()
        )
        .subscribe(value => this.selectChurchService.changeFilter(value))
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
