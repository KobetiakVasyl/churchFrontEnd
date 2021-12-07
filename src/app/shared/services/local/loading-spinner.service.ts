import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class LoadingSpinnerService {
  showLoading = false;

  startLoading(): void {
    this.showLoading = true;
  }

  stopLoading(): void {
    this.showLoading = false;
  }
}
