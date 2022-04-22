import {Component, Input} from '@angular/core';
import {IAnnouncement} from "../../../../../../../shared/interfaces/announcement.interfaces";

@Component({
  selector: 'app-announcement-list-item',
  templateUrl: './announcement-list-item.component.html',
  styleUrls: ['./announcement-list-item.component.scss']
})
export class AnnouncementListItemComponent {
  @Input() announcement!: IAnnouncement;
}
