import {Component, Input} from '@angular/core';
import {IChurch} from "../../../../../shared/interfaces/church.interfaces";

@Component({
  selector: 'app-admin-select-church-item',
  templateUrl: './admin-select-church-item.component.html',
  styleUrls: ['./admin-select-church-item.component.scss']
})
export class AdminSelectChurchItemComponent {
  @Input() churchInfo!: IChurch;
}
