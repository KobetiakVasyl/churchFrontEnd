import {Provider} from "@angular/core";
import {MAT_DATE_RANGE_SELECTION_STRATEGY} from "@angular/material/datepicker";
import {DateRangeSelectionStrategy} from "../services/local/date-range-selection-strategy.service";

export const DATE_RANGE_SELECTION_STRATEGY_PROVIDER: Provider = {
  provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
  useClass: DateRangeSelectionStrategy
}
