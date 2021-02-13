import {Component, Input, OnInit} from '@angular/core';
import {CardInfo} from "../../interfaces";

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss']
})
export class InfoCardComponent implements OnInit {
  @Input() cardInfo: CardInfo = {
    title: '',
    subtitle: '',
    content: '',
    images: [],
    isEditable: false
  };

  constructor() { }

  ngOnInit(): void {
  }

}
