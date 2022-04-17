import { Injectable } from '@angular/core';

@Injectable()
export class ErrorMessageService {
  private _errorMessage!: string | null;
  private _showErrorMessage = false;

  set errorMessage(value: string | null) {
    this._errorMessage = value;
  }

  get errorMessage(): string | null {
    return this._showErrorMessage ? this._errorMessage : null;
  }

  hideErrorMessage() {
    this._showErrorMessage = false;
  }

  showErrorMessage() {
    this._showErrorMessage = true;
  }
}
