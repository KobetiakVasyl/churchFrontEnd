import {Injectable} from '@angular/core';
import {DateRange, MatDateRangeSelectionStrategy} from "@angular/material/datepicker";
import {DateAdapter} from "@angular/material/core";

@Injectable()
export class DateRangeSelectionStrategy<D> implements MatDateRangeSelectionStrategy<D> {
  constructor(private _dateAdapter: DateAdapter<D>) {
  }

  selectionFinished(date: D | null, currentRange: DateRange<D>): DateRange<D> {
    return this._handleDateChange(date, currentRange);
  }

  createPreview(date: D | null, currentRange: DateRange<D>): DateRange<D> {
    return this._handleDateChange(date, currentRange);
  }

  private _handleDateChange(date: D | null, currentRange: DateRange<D>): DateRange<D> {
    if (!date) return currentRange;

    if (!currentRange.start && !currentRange.end) return new DateRange<D>(null, date);
    else if (!currentRange.start && currentRange.end) return this._getRangeFromComparison(date, currentRange.end);
    else if (currentRange.start && !currentRange.end) return this._getRangeFromComparison(date, currentRange.start);
    else return new DateRange<D>(null, date);
  }

  private _getRangeFromComparison(date: D, currentDate: D): DateRange<D> {
    if (this._dateAdapter.compareDate(date, currentDate) > 1) {
      return new DateRange<D>(currentDate, date);
    } else {
      return new DateRange<D>(date, currentDate);
    }
  }
}
