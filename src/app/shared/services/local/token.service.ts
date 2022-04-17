import { Injectable } from '@angular/core';
import {ELocalStorage} from "../../enums/local-storage.enums";

@Injectable({providedIn: 'root'})
export class TokenService {
  static isAuthorized(): boolean {
    return !!localStorage.getItem(ELocalStorage.TOKEN);
  }
}
