import {Component, Input, OnInit} from '@angular/core';
import {IChurchListItem} from "../../../../../shared/interfaces/church.interfaces";

@Component({
  selector: 'app-select-church-item',
  templateUrl: './select-church-item.component.html',
  styleUrls: ['./select-church-item.component.scss']
})
export class SelectChurchItemComponent implements OnInit {
  @Input() churchInfo!: IChurchListItem;

  constructor() { }

  ngOnInit(): void {
  }

}
