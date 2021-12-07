import {Component, OnDestroy, OnInit} from '@angular/core';
import {Snackbar} from '../../interfaces/shared.interfaces';
import {SnackbarService} from '../../services/local/snackbar.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit, OnDestroy {
  private readonly MINIMAL_SNACKBAR_TIMEOUT = 3000;

  snackbars: Snackbar[] = [];

  subscriptions = new Subscription();

  constructor(private snackbarService: SnackbarService) {
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.snackbarService.snackbarAdded
        .subscribe(this.handleSnackbarAdd.bind(this))
    );

    this.subscriptions.add(
      this.snackbarService.snackbarRemoved
        .subscribe(this.removeSnackbarById.bind(this))
    );

    this.snackbarService.info('Цим сайтом можна користуватися за допомогою телефону');
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  handleSnackbarAdd(snackbar: Snackbar): void {
    this.snackbars.push(snackbar);

    if (snackbar.isSynchronous) {
      let time = (snackbar.message.length * 100);

      time = time > this.MINIMAL_SNACKBAR_TIMEOUT ? time : this.MINIMAL_SNACKBAR_TIMEOUT;

      setTimeout(() => this.removeSnackbarById(snackbar.id), time);
    }
  }

  removeSnackbarById(id: number): void {
    this.snackbars = this.snackbars.filter((el) => el.id !== id);
  }

  removeSnackbarByIndex(index: number): void {
    this.snackbars.splice(index, 1);
  }
}
