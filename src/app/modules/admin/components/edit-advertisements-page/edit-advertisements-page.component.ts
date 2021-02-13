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
  readonly columnsToDisplay = ['select', 'date', 'title', 'subtitle', 'content', 'delete'];

  filterControl = new FormControl(null);

  dataSource = new MatTableDataSource([
    {
      id: 1,
      title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aspernatur consectetur',
      subtitle: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aspernatur consectetur cum dolor earum fugit hic itaque labore maxime officiis omnis perferendis, provident quis quo reiciendis reprehenderit sit velit vitae! Aperiam autem hic illo nam quas quia quis vel! Aperiam cumque impedit optio, provident quisquam reiciendis similique unde? Accusamus asperiores aspernatur, cumque dolorem, doloremque exercitationem explicabo magnam molestias mollitia nam natus porro quasi',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aspernatur consectetur cum dolor earum fugit hic itaque labore maxime officiis omnis perferendis, provident quis quo reiciendis reprehenderit sit velit vitae! Aperiam autem hic illo nam quas quia quis vel! Aperiam cumque impedit optio, provident quisquam reiciendis similique unde? Accusamus asperiores aspernatur, cumque dolorem, doloremque exercitationem explicabo magnam molestias mollitia nam natus porro quasi sequi vero voluptates? Amet assumenda, beatae commodi delectus distinctio doloribus dolorum est in iste minus nostrum obcaecati quas sed vel vitae? Accusamus, animi, atque consequuntur doloribus error eveniet facilis id nobis non pariatur quidem rerum unde veniam?',
      date: '12/32/1234'
    },
    {
      id: 2,
      title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aspernatur consectetur',
      subtitle: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aspernatur consectetur Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aspernatur consectetur',
      content: '2222',
      date: '12/32/1434'
    },
    {
      id: 3,
      title: '3',
      subtitle: '33',
      content: '3333',
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

  handleSelectAll(event: MatCheckboxChange): null | void {
    if (!event) return null;

    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  handleSelectionChange(event: MatCheckboxChange, element: any): null | void {
    if (!event) return null;

    this.selection.toggle(element);
  }

  handleDeleteItem(element: any) {
    if (!this.selection.isEmpty()) return;

    this.editAdvertisementService.handleDeleteItem(element).subscribe(response => {
      const i = this.dataSource.data.findIndex(({id}) => id === element.id);

      this.dataSource.data.splice(i, 1);
      this.dataSource._updateChangeSubscription();
    });
  }

  handleDeleteMultipleItems(): void {
    if (this.selection.isEmpty()) return;


  }

  isAllSelected(): boolean {
    return this.selection.selected.length === this.dataSource.data.length;
  }
}
