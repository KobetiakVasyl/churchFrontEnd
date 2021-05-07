import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PhoneViewListDisplayOption} from '../../shared/interfaces';

@Component({
  selector: 'app-edit-advertisements-page',
  templateUrl: './edit-advertisements-page.component.html',
  styleUrls: ['./edit-advertisements-page.component.scss']
})
export class EditAdvertisementsPageComponent implements OnInit {
  readonly pageSizeOptions = [5, 10, 15, 20];
  readonly columnsToDisplay = ['select', 'edit', 'date', 'title', 'content', 'delete'];
  readonly phoneViewListOptionsToDisplay: PhoneViewListDisplayOption[] = [
    {label: 'дата створення', key: 'date'},
    {label: 'заголовок', key: 'title'},
    {label: 'опис', key: 'content'}
  ];

  dataSource = [
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
  ];

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  removeItemFromDatabase(event: number[]): void {

  }

  handleCreateItem(): void {
    this.router
      .navigate(['', 'admin', 'advertisements', 'create']);
  }

  handleEditItem(id: number): void {
    this.router
      .navigate(['', 'admin', 'advertisements', 'edit', id]);
  }
}
