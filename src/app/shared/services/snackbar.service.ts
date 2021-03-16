import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {Snackbar, SnackbarRef} from "./interfaces";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private createSnackbarSource = new Subject<Snackbar>();
  readonly snackbarAdded = this.createSnackbarSource.asObservable();

  private removeSnackbarSource = new Subject<number>();
  readonly snackbarRemoved = this.removeSnackbarSource.asObservable();

  info(message: string, isSynchronous: boolean = true): SnackbarRef {
    const id = Date.now();

    this.createSnackbarSource.next({
      id,
      message,
      isSynchronous,
      type: 'info'
    });

    return {
      close: this.closeSnackbar.bind(this, id)
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
      close: this.closeSnackbar.bind(this, id)
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
      close: this.closeSnackbar.bind(this, id)
    }
  }

  private closeSnackbar(id: number): void {
    this.removeSnackbarSource.next(id);
  }
}
