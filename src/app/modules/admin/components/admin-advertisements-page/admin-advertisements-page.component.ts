import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PhoneViewListDisplayOption, SnackbarRef} from '../../../../shared/interfaces/shared.interfaces';
import {IAnnouncement, ICreateAnnouncement} from '../../../../shared/interfaces/announcements.interfaces';
import {AdvertisementsService} from '../../../../shared/services/API/advertisements.service';
import {MatDialog} from '@angular/material/dialog';
import {AnnouncementPopUpComponent} from '../../shared/components/announcement-pop-up/announcement-pop-up.component';
import {filter, finalize, mergeMap, tap} from 'rxjs/operators';
import {IChurch} from '../../../../shared/interfaces/church.interfaces';
import {SnackbarService} from '../../../../shared/services/local/snackbar.service';

@Component({
  selector: 'app-edit-advertisements-page',
  templateUrl: './admin-advertisements-page.component.html',
  styleUrls: ['./admin-advertisements-page.component.scss']
})
export class AdminAdvertisementsPageComponent implements OnInit {
  readonly pageSizeOptions = [5, 10, 15, 20];
  readonly columnsToDisplay = ['select', 'edit', 'date', 'name', 'description', 'delete'];
  readonly phoneViewListOptionsToDisplay: PhoneViewListDisplayOption[] = [
    {label: 'дата створення', key: 'date'},
    {label: 'заголовок', key: 'name'},
    {label: 'опис', key: 'description'}
  ];

  dataSource: IAnnouncement[] = [];
  private churchInfo!: Partial<IChurch>;

  constructor(
    private readonly advertisementsService: AdvertisementsService,
    private readonly snackbarService: SnackbarService,
    private readonly router: Router,
    private readonly dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.churchInfo = JSON.parse(<string> localStorage.getItem('churchInfo'));
    // this.advertisementsService.getAll(this.churchInfo.id as number, new Date(), 10, 0).subscribe(response => {
    //   console.log(response);
    // });
  }

  removeItemFromDatabase(event: number[]): void {

  }

  handleCreateItem(): void {
    const dialogRef = this.dialog.open(AnnouncementPopUpComponent, {
      maxWidth: '400px',
      width: '100%',
      data: {
        title: 'Створити Оголошення',
        buttonText: 'Створити'
      }
    });

    dialogRef.afterClosed()
      .pipe(
        filter(response => !!response),
        mergeMap(response => {
          const body: ICreateAnnouncement = {
            churchId: this.churchInfo.id + '',
            ...response
          };

          const snackbarRef = this.snackbarService.info('Додаємо оголошення', false);

          return this.advertisementsService.create(body)
            .pipe(finalize(() => snackbarRef.close()));
        }),
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  handleEditItem(id: number): void {
    this.router
      .navigate(['', 'admin', 'advertisements', 'edit', id]);
  }
}
