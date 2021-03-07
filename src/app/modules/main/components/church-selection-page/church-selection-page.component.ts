import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable, Subscription} from "rxjs";

import {AutocompleteService} from "../../../../shared/services/autocomplete.service";

import {Church} from "../../shared/interfaces";

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

  churches: Church[] = [
    {
      id: 1,
      name: 'ASDQWE'
    },
    {
      id: 2,
      name: 'QWEASD'
    },
    {
      id: 3,
      name: 'QWEASDQWEASD'
    }
  ];

  filteredChurches!: Observable<Church[]>;

  subscriptions = new Subscription();

  constructor(
    private autocompleteService: AutocompleteService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    const churchNameControl = this.formGroup.get('name') as FormControl;

    this.filteredChurches = this.autocompleteService
      .initializeAutocompleteFiltering('name', this.churches, churchNameControl)

    this.subscriptions.add(
      churchNameControl.valueChanges
        .subscribe(this.handleChurchNameChange.bind(this))
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  submit(): void {
    if (this.formGroup.invalid) return;

    localStorage.setItem('churchInfo', JSON.stringify(this.formGroup.value));

    this.router.navigate(['', 'overview', this.formGroup.value.id]);
  }

  handleChurchNameChange(value: string): void {
    const id = this.autocompleteService.findIdBy('name', value, this.churches);

    this.formGroup.patchValue({id});
  }
}
