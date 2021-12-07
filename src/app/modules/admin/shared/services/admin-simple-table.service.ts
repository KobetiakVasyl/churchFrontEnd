import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EMPTY, Observable, of} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';

import {MessagePopUpComponent} from '../../../../shared/components/message-pop-up/message-pop-up.component';

@Injectable({providedIn: 'root'})
export class AdminSimpleTableService {
  constructor(
    private dialog: MatDialog,
    private http: HttpClient
  ) {
  }

  handleRemoveItem(element: any): Observable<boolean> {
    const sliceAmount = 30;

    let {title, content} = element;

    if (title.length > sliceAmount) {
      title = title.slice(0, sliceAmount) + '...';
    }

    if (content.length > sliceAmount) {
      content = content.slice(0, sliceAmount) + '...';
    }

    const dialogRef = this.dialog.open(MessagePopUpComponent, {
      data: {
        content: `Наступний запис буде видалено: \n\n Заголовок: ${title} \n\n Опис: ${content}`
      }
    });

    return dialogRef.afterClosed()
      .pipe(mergeMap(response => response ? of(response) : EMPTY));
  }

  handleDeleteMultipleItems(): Observable<boolean> {
    const dialogRef = this.dialog.open(MessagePopUpComponent, {
      data: {
        content: 'Обрані записи будуть видалені. Продовжити?',
        resolveButtonLabel: 'Так'
      }
    });

    return dialogRef.afterClosed()
      .pipe(mergeMap(response => response ? of(response) : EMPTY));
  }
}
