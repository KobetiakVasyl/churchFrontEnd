import {Component, OnDestroy, OnInit} from '@angular/core';
import {ViewImageShowFullService} from '../../services/local/view-image-show-full.service';
import {Subscription} from 'rxjs';
import {IImage} from '../../interfaces/shared.interfaces';

@Component({
  selector: 'app-view-image-full-screen',
  templateUrl: './view-image-full-screen.component.html',
  styleUrls: ['./view-image-full-screen.component.scss']
})
export class ViewImageFullScreenComponent implements OnInit, OnDestroy {
  img: IImage | null = null;

  subscriptions = new Subscription();

  constructor(private viewImageShowFullService: ViewImageShowFullService) {
  }

  ngOnInit(): void {
    this.viewImageShowFullService.imageSelected$
      .subscribe(img => this.img = img);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  closeShowFullView(): void {
    this.img = null;
  }
}
