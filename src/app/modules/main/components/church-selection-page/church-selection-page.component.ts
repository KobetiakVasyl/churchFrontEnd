import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';

import {AutocompleteService} from '../../../../shared/services/local/autocomplete.service';
import {IChurch, IChurchItem} from '../../../../shared/interfaces/church.interfaces';
import {ChurchService} from '../../../../shared/services/API/church.service';
import {debounceTime, distinctUntilChanged, mergeMap, startWith, tap} from 'rxjs/operators';

@Component({
  selector: 'app-church-selection-page',
  templateUrl: './church-selection-page.component.html',
  styleUrls: ['./church-selection-page.component.scss']
})
export class ChurchSelectionPageComponent implements OnInit {
  selectedChurch!: Partial<IChurch>;

  redirectURLSegment: string[] = [''];

  nameFormControl = new FormControl(null, Validators.required);

  churches: IChurch[] = [];

  churches$!: Observable<IChurchItem[]>;

  constructor(
    private readonly autocompleteService: AutocompleteService,
    private readonly churchService: ChurchService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.selectedChurch = JSON.parse(localStorage.getItem('churchInfo') as string);

    this.churches$ = this.route.data
      .pipe(
        mergeMap(data => {
          if (data?.openedFromAdminPanel) this.redirectURLSegment.push('admin');
          return this.nameFormControl.valueChanges;
        }),
        startWith(''),
        distinctUntilChanged(),
        debounceTime(500),
        mergeMap(value => this.churchService.search(value)),
        tap(churches => {
          const id = this.autocompleteService.findIdBy('name', this.nameFormControl.value, churches);
          if (!!id) this.submit(id);
        })
      );

    if (this.selectedChurch) {
      this.nameFormControl.setValue(this.selectedChurch.name, {emitEvent: false});
    }
  }

  submit(id: number): void {
    if (this.nameFormControl.pristine || this.nameFormControl.invalid) return;

    localStorage.setItem('churchInfo', JSON.stringify({id, name: this.nameFormControl.value}));

    this.router.navigate([...this.redirectURLSegment, 'overview', id]);
  }
}
