import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EMPTY, Observable} from "rxjs";
import {mergeMap} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";

import {MessagePopUpComponent} from "../../../../shared/components/message-pop-up/message-pop-up.component";

@Injectable({providedIn: 'root'})
export class EditAdvertisementService {
  constructor(
    private dialog: MatDialog,
    private http: HttpClient
  ) {
  }

  handleDeleteItem(element: any): Observable<any> {
    const sliceAmount = 30;

    let {title, subtitle, content} = element;

    if (title.length > sliceAmount) {
      title = title.slice(0, sliceAmount) + '...';
    }

    if (subtitle.length > sliceAmount) {
      subtitle = subtitle.slice(0, sliceAmount) + '...';
    }

    if (content.length > sliceAmount) {
      content = content.slice(0, sliceAmount) + '...';
    }

    const dialogRef = this.dialog.open(MessagePopUpComponent, {
      data: {
        content: `Наступний запис буде видалено: \n\n Заголовок: ${title} \n\n Підзаголовок: ${subtitle} \n\n Опис: ${content}`
      }
    })

    return dialogRef.afterClosed()
      .pipe(
        mergeMap(response => {
          if (!response) return EMPTY;

          return EMPTY;
        })
      );
  }
}
