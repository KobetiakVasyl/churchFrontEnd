import {Provider} from "@angular/core";
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogConfig} from "@angular/material/dialog";

const options: MatDialogConfig = {
  disableClose: true
}

export const MAT_DIALOG_PROVIDER: Provider = {
  provide: MAT_DIALOG_DEFAULT_OPTIONS,
  useValue: options
}
