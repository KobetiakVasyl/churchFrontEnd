import {Injectable} from '@angular/core';
import {FormControl} from "@angular/forms";
import {distinctUntilChanged, map, startWith} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AutocompleteService {

  initializeAutocompleteFiltering(key: string, options: any[], control: FormControl): Observable<any[]> {
    return control.valueChanges.pipe(
      startWith(''),
      distinctUntilChanged(),
      map(value => this._filter(key, value, options))
    );
  }

  private _filter(key: string, value: string, options: any[]): string[] {
    if (!options.length) return options;

    const filterValue = value.toLowerCase().trim();
    return options.filter(option => option[key].toLowerCase().indexOf(filterValue) === 0);
  }

  findIdBy(key: string, valueToCompare: string, options: any[]): number | null {
    const option = options.find(option => option[key] === valueToCompare);

    if (!option) return null;

    return option.id;
  }
}
