import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

interface Data {
  title: string;
  content: string;
  rejectButtonLabel: string;
  resolveButtonLabel: string;
}

@Component({
  selector: 'app-message-pop-up',
  templateUrl: './message-pop-up.component.html',
  styleUrls: ['./message-pop-up.component.scss']
})
export class MessagePopUpComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Data,
    public dialogRef: MatDialogRef<MessagePopUpComponent>
  ) {
  }

  ngOnInit(): void {
    if (!this.data.hasOwnProperty('title')) {
      this.data.title = 'Увага!';
    }

    if (!this.data.hasOwnProperty('content')) {
      this.data.content = 'Сталася помилка. Будь ласка перезапустіть сторінку';
    }

    if (!this.data.hasOwnProperty('resolveButtonLabel')) {
      this.data.resolveButtonLabel = 'Добре';
    }

    if (!this.data.hasOwnProperty('rejectButtonLabel')) {
      this.data.rejectButtonLabel = 'Скасувати';
    }
  }

  close(): void {
    this.dialogRef.close(null);
  }
}
