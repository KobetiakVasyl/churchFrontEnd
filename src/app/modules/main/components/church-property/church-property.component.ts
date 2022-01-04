import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-church-property',
  templateUrl: './church-property.component.html'
})
export class ChurchPropertyComponent {
  @Input() key: string = 'N/A';
  @Input() value: string = 'N/A';
}
