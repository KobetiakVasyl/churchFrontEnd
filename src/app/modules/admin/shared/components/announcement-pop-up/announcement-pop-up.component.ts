import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';

interface IData {
  title: string;
  buttonText: string;
  body?: any
}

@Component({
  selector: 'app-announcement-pop-up',
  templateUrl: './announcement-pop-up.component.html',
  styleUrls: ['./announcement-pop-up.component.scss']
})
export class AnnouncementPopUpComponent implements OnInit {
  formGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required)
  });

  constructor(
    public dialogRef: MatDialogRef<AnnouncementPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IData,
  ) {
  }

  ngOnInit(): void {
    if (this.data.hasOwnProperty('body')) {
      this.formGroup.patchValue(this.data.body);
    }
  }

  get nameFormControl(): FormControl {
    return this.formGroup.get('name') as FormControl;
  }

  get descriptionFormControl(): FormControl {
    return this.formGroup.get('description') as FormControl;
  }

  submit(): void {
    if (this.formGroup.invalid) {
      return;
    }

    this.dialogRef.close(this.formGroup.value);
  }
}
