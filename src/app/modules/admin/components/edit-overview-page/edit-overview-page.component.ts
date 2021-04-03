import {Component} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {CardImage} from "../../../main/shared/interfaces";

@Component({
  selector: 'app-edit-overview-page',
  templateUrl: './edit-overview-page.component.html',
  styleUrls: ['./edit-overview-page.component.scss']
})
export class EditOverviewPageComponent {
  formGroup = new FormGroup({
    churchName: new FormControl(null, Validators.required),
    deanery: new FormControl(null, Validators.required),
    diocese: new FormControl(null, Validators.required),
    locality: new FormControl(null, Validators.required),
    priestName: new FormControl(null, Validators.required),
    email: new FormControl(null, [
      Validators.required,
      Validators.email
    ]),
    churchDescription: new FormControl(null, [
      Validators.required,
      Validators.minLength(0),
      Validators.maxLength(350)
    ]),
    phoneNumber: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[0-9]*$/),
      Validators.minLength(12),
      Validators.maxLength(12)
    ]),
  });

  images: CardImage[] = [
    {
      src: 'data:image/jpeg;base64,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',
      alt: ''
    },
    {
      src: 'data:image/jpeg;base64,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',
      alt: ''
    }
  ];

  constructor() {
  }

  get phoneNumberFormControl(): FormControl {
    return this.formGroup.get('phoneNumber') as FormControl;
  }

  get churchDescriptionFormControl(): FormControl {
    return this.formGroup.get('churchDescription') as FormControl;
  }

  addImage(): void {

  }

  submit(): void {
    if (this.formGroup.invalid) return;


  }
}
