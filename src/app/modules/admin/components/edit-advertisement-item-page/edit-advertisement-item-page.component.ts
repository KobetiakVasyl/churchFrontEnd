import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {CardImage} from '../../../main/shared/interfaces';

@Component({
  selector: 'app-edit-advertisement-item-page',
  templateUrl: './edit-advertisement-item-page.component.html',
  styleUrls: ['./edit-advertisement-item-page.component.scss']
})
export class EditAdvertisementItemPageComponent implements OnInit {
  formGroup = new FormGroup({
    title: new FormControl(null, Validators.required),
    content: new FormControl(null, Validators.required),
  });

  images: CardImage[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }
}
