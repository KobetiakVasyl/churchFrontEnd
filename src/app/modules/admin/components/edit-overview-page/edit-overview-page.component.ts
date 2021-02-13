import {Component} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {QuillModules} from "ngx-quill";

@Component({
  selector: 'app-edit-overview-page',
  templateUrl: './edit-overview-page.component.html',
  styleUrls: ['./edit-overview-page.component.scss']
})
export class EditOverviewPageComponent {
  overviewControl = new FormControl(null, Validators.required);

  constructor() {
  }

  submit(): void {
    if (this.overviewControl.invalid) return;


  }
}
