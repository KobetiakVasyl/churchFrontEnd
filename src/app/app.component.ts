import {Component} from '@angular/core';
import {LoadingSpinnerService} from "./shared/services/loading-spinner.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public loadingSpinnerService: LoadingSpinnerService) {

  }
}
