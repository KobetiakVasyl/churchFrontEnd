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

    if (!currentRange.start) return new DateRange<D>(date, null);
    if (!currentRange.end) return this._getRangeFromComparison(date, currentRange.start);

    if (this._isEqual(date, currentRange.start) || this._isEqual(date, currentRange.end)) return new DateRange<D>(null, this._dateAdapter.today());

    const isAfterEndDate = this._isAfter(date, currentRange.end);

    if (isAfterEndDate) return new DateRange<D>(currentRange.start, date);

    const isBeforeStartDate = !this._isAfter(date, currentRange.start);

    if (isBeforeStartDate) return new DateRange<D>(date, currentRange.end);

    const startDiff = (date as any).getTime() - (currentRange.start as any).getTime();
    const endDiff = (currentRange.end as any).getTime() - (date as any).getTime();

    if (startDiff < endDiff) return new DateRange<D>(date, currentRange.end)
    else return new DateRange<D>(currentRange.start, date);
  }

  private _getRangeFromComparison(date: D, currentDate: D): DateRange<D> {
    if (this._isAfter(date, currentDate)) {
      return new DateRange<D>(currentDate, date);
    } else {
      return new DateRange<D>(date, currentDate);
    }
  }

  private _isAfter(date: D, currentDate: D): boolean {
    return this._dateAdapter.compareDate(date, currentDate) > 1;
  }

  private _isEqual(date: D, currentDate: D): boolean {
    return this._dateAdapter.compareDate(date, currentDate) === 0;
  }
}
