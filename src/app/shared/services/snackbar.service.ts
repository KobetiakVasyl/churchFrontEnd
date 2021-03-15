import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {Snackbar, SnackbarRef} from "./interfaces";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  createSnackbarSource = new Subject<Snackbar>();
  snackbarAdded = this.createSnackbarSource.asObservable();

  removeSnackbarSource = new Subject<number>();
  snackbarRemoved = this.removeSnackbarSource.asObservable();

  info(message: string, isSynchronous: boolean = true): SnackbarRef {
    const id = Date.now();

    this.createSnackbarSource.next({
      id,
      message,
      isSynchronous,
      type: 'info'
    });

    return {
      remove: this.remove.bind(this, id)
    }
  }

  success(message: string, isSynchronous: boolean = true): SnackbarRef {
    const id = Date.now();

    this.createSnackbarSource.next({
      id,
      message,
      isSynchronous,
      type: 'success'
    });

    return {
      remove: this.remove.bind(this, id)
    }
  }

  error(message: string, isSynchronous: boolean = true): SnackbarRef {
    const id = Date.now();

    this.createSnackbarSource.next({
      id,
      message,
      isSynchronous,
      type: 'error'
    });

    return {
      remove: this.remove.bind(this, id)
    }
  }

  remove(id: number): void {
    this.removeSnackbarSource.next(id);
  }
}
