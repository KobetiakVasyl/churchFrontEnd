import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';

import {AutocompleteService} from '../../../../shared/services/local/autocomplete.service';
import {Church, ChurchListItem} from '../../../../shared/interfaces/church.interfaces';
import {ChurchService} from '../../../../shared/services/API/church.service';
import {debounceTime, distinctUntilChanged, mergeMap, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-church-selection-page',
  templateUrl: './church-selection-page.component.html',
  styleUrls: ['./church-selection-page.component.scss']
})
export class ChurchSelectionPageComponent implements OnInit, OnDestroy {
  formGroup = new FormGroup({
    id: new FormControl(null, Validators.required),
    name: new FormControl(null, Validators.required)
  });

  churches: Church[] = [];

  churches$!: Observable<ChurchListItem[]>;

  subscriptions = new Subscription();

  constructor(
    private readonly autocompleteService: AutocompleteService,
    private readonly churchService: ChurchService,
    private readonly router: Router
  ) {
  }

  ngOnInit(): void {
    this.churches$ = (this.formGroup.get('name') as FormControl).valueChanges
      .pipe(
        startWith(''),
        distinctUntilChanged(),
        debounceTime(500),
        mergeMap(value => this.churchService.search(value))
      );

    const churchInfo = JSON.parse(localStorage.getItem('churchInfo') as string);

    if (churchInfo) {
      this.formGroup.patchValue({name: churchInfo.name});
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  submit(): void {
    if (this.formGroup.invalid) {
      return;
    }

    const id = this.autocompleteService.findIdBy('name', this.formGroup.value.name, this.churches);

    localStorage.setItem('churchInfo', JSON.stringify(this.formGroup.value));

    this.router.navigate(['', 'overview', id]);
  }
}
