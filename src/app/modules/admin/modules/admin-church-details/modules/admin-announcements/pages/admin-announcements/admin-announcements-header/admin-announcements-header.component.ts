import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-admin-announcements-header',
  templateUrl: './admin-announcements-header.component.html',
  styleUrls: ['./admin-announcements-header.component.scss']
})
export class AdminAnnouncementsHeaderComponent implements OnInit {

  constructor(public readonly route: ActivatedRoute) {
  }

  ngOnInit(): void {
  }
}
