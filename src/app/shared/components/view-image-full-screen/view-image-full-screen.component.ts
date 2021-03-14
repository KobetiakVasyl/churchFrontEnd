import {Component, OnDestroy, OnInit} from '@angular/core';
import {CardImage} from "../../../modules/main/shared/interfaces";
import {ViewImageShowFullService} from "../../services/view-image-show-full.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-view-image-full-screen',
  templateUrl: './view-image-full-screen.component.html',
  styleUrls: ['./view-image-full-screen.component.scss']
})
export class ViewImageFullScreenComponent implements OnInit, OnDestroy {
  img: CardImage | null = null;

  subscriptions = new Subscription();

  constructor(private viewImageShowFullService: ViewImageShowFullService) {
  }

  ngOnInit(): void {
    this.viewImageShowFullService.imageSelected
      .subscribe(img => this.img = img);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  closeShowFullView(): void {
    this.img = null;
  }
}
