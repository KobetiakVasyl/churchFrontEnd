import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CardImage} from '../../../../shared/interfaces/shared.interfaces';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-edit-advertisement-item-page',
  templateUrl: './admin-advertisement-item-page.component.html',
  styleUrls: ['./admin-advertisement-item-page.component.scss']
})
export class AdminAdvertisementItemPageComponent implements OnInit {
  titleAction!: string;

  formGroup = new FormGroup({
    title: new FormControl(null, Validators.required),
    content: new FormControl(null, Validators.required),
  });

  images: CardImage[] = [];

  constructor(
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.data
      .subscribe(data => this.titleAction = data.title);
  }
}
