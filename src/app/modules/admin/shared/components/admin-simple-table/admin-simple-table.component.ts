import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {SelectionModel} from '@angular/cdk/collections';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {MatTableDataSource} from '@angular/material/table';
import {Subscription} from 'rxjs';
import {delay, distinctUntilChanged, map, skipWhile} from 'rxjs/operators';

import {AdminSimpleTableService} from '../../services/admin-simple-table.service';

import {AdminSimpleTableRecord, PhoneViewListDisplayOption} from '../../../../../shared/interfaces/shared.interfaces';

@Component({
  selector: 'app-admin-simple-table',
  templateUrl: './admin-simple-table.component.html',
  styleUrls: ['./admin-simple-table.component.scss']
})
export class AdminSimpleTableComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() pageSizeOptions: number[] = [5];
  @Input() columnsToDisplay: string[] = [];
  @Input() phoneViewListOptionsToDisplay: PhoneViewListDisplayOption[] = [];

  @Input() set initDataSource(dataSource: AdminSimpleTableRecord[]) {
    this.dataSource = new MatTableDataSource<AdminSimpleTableRecord>(dataSource);
  }

  @Output('onRemove') removeItems = new EventEmitter<number[]>();
  @Output('onCreate') createItem = new EventEmitter<void>();
  @Output('onEdit') editItem = new EventEmitter<number>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource!: MatTableDataSource<AdminSimpleTableRecord>;

  filterControl = new FormControl(null);

  selection = new SelectionModel<AdminSimpleTableRecord>(true, []);

  subscriptions = new Subscription();

  constructor(private adminSimpleTableService: AdminSimpleTableService) {
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.filterControl.valueChanges
        .pipe(
          distinctUntilChanged(),
          delay(300),
          map(v => v.trim()),
          skipWhile(v => !v)
        )
        .subscribe(filter => this.dataSource.filter = filter)
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  create(): void {
    this.createItem.emit();
  }

  edit(id: number): void {
    this.editItem.emit(id);
  }

  remove(element: AdminSimpleTableRecord): void {
    if (!this.selection.isEmpty()) {
      return;
    }

    this.adminSimpleTableService.handleRemoveItem(element).subscribe(response => {
      this.removeItems.emit([element.id]);

      this.removeItemFromDataSource(element.id);

      this.dataSource._updateChangeSubscription();
    });
  }

  handleRemoveMultiple(): void {
    if (this.selection.isEmpty()) {
      return;
    }

    this.adminSimpleTableService.handleDeleteMultipleItems().subscribe(() => {
      const ids = this.selection.selected.map(el => el.id);

      this.removeItems.emit(ids);

      ids.forEach(id => this.removeItemFromDataSource(id));

      this.dataSource._updateChangeSubscription();
    });
  }

  handleSelectionChange(event: MatCheckboxChange, element: AdminSimpleTableRecord): null | void {
    if (!event) {
      return;
    }

    this.selection.toggle(element);
  }

  handleSelectAll(event: MatCheckboxChange): null | void {
    if (!event) {
      return;
    }

    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  isAllSelected(): boolean {
    return this.selection.selected.length === this.dataSource.data.length;
  }

  private removeItemFromDataSource(idToFilter: number): void {
    const i = this.dataSource.data
      .findIndex(({id}) => id === idToFilter);

    this.dataSource.data.splice(i, 1);
  }
}
