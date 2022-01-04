import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
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
  formGroup = new FormGroup({
    id: new FormControl(null, Validators.required),
    name: new FormControl(null, Validators.required)
  });

  churches: IChurch[] = [];

  churches$!: Observable<IChurchItem[]>;

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
        mergeMap(value => this.churchService.search(value)),
        tap(churches => {
          const id = this.autocompleteService.findIdBy('name', this.formGroup.value.name, churches);
          if (!!id) this.formGroup.patchValue({id}, {emitEvent: false})
        })
      );

    const churchInfo = JSON.parse(localStorage.getItem('churchInfo') as string);

    if (churchInfo) {
      this.formGroup.patchValue({name: churchInfo.name});
    }
  }

  submit(): void {
    if (this.formGroup.invalid) {
      return;
    }

    localStorage.setItem('churchInfo', JSON.stringify(this.formGroup.value));

    this.router.navigate(['', 'overview', this.formGroup.value.id]);
  }
}
