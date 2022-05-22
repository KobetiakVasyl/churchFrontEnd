import {Component, Input} from '@angular/core';
import {IAnnouncement} from "../../../../../../../../../shared/interfaces/announcement.interfaces";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-admin-announcements-list-item',
  templateUrl: './admin-announcements-list-item.component.html',
  styleUrls: ['./admin-announcements-list-item.component.scss'],
})
export class AdminAnnouncementsListItemComponent {
  @Input()
  announcement!: IAnnouncement;

  constructor(public readonly activatedRoute: ActivatedRoute) {
  }
}
