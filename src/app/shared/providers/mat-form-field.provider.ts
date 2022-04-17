import {Provider} from "@angular/core";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions} from "@angular/material/form-field";

const options: MatFormFieldDefaultOptions = {
  appearance: 'outline',
  floatLabel: 'always'
};

export const MAT_FORM_FIELD_PROVIDER: Provider = {
  provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
  useValue: options
};
