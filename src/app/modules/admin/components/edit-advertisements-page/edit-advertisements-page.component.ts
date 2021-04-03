import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Subscription} from "rxjs";
import {delay, distinctUntilChanged, map, skipWhile} from "rxjs/operators";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {SelectionModel} from "@angular/cdk/collections";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {EditAdvertisementService} from "../../shared/services/edit-advertisement.service";

@Component({
  selector: 'app-edit-advertisements-page',
  templateUrl: './edit-advertisements-page.component.html',
  styleUrls: ['./edit-advertisements-page.component.scss']
})
export class EditAdvertisementsPageComponent implements OnInit, AfterViewInit, OnDestroy {
  readonly pageSizeOptions = [5, 10, 15, 20];
  readonly columnsToDisplay = ['select', 'edit', 'date', 'title', 'content', 'delete'];

  filterControl = new FormControl(null);

  dataSource = new MatTableDataSource([
    {
      id: 1,
      title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aspernatur consectetur',
      content: ' sit velit vitae! e dolorem, doloremque exercitationem explicabo magnam molestias mollitia nam natus porro quasi',
      date: '12/32/1234'
    },
    {
      id: 2,
      title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aspernatur consectetur Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aspernatur consectetur',
      date: '12/32/1434'
    },
    {
      id: 3,
      title: '3',
      content: '33',
      date: '12/32/2034'
    }
  ]);

  selection = new SelectionModel<any>(true, []);

  subscriptions = new Subscription();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private editAdvertisementService: EditAdvertisementService) {
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

  remove(element: any) {
    if (!this.selection.isEmpty()) return;

    this.editAdvertisementService.handleRemoveItem(element).subscribe(response => {
      this.removeItemFromDataSource(element.id);

      this.dataSource._updateChangeSubscription();
    });
  }

  handleRemoveMultipleItems(): void {
    if (this.selection.isEmpty()) return;

    this.editAdvertisementService.handleDeleteMultipleItems().subscribe(() => {
      this.selection.selected
        .forEach(el => this.removeItemFromDataSource(el.id));

      this.dataSource._updateChangeSubscription();
    });
  }

  handleSelectionChange(event: MatCheckboxChange, element: any): null | void {
    if (!event) return;

    this.selection.toggle(element);
  }

  handleSelectAll(event: MatCheckboxChange): null | void {
    if (!event) return;

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
