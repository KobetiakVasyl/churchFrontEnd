import {Component, Input, OnInit} from '@angular/core';
import {debounceTime, filter, fromEvent, map, Observable} from "rxjs";

@Component({
  selector: 'app-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.scss']
})
export class ScrollToTopComponent implements OnInit {
  @Input() topOffset = 100;

  scrollToTopButton$!: Observable<boolean>;

  ngOnInit(): void {
    this.scrollToTopButton$ = fromEvent(document, 'scroll')
      .pipe(
        debounceTime(500),
        map(() => document.body.scrollTop > this.topOffset || document.documentElement.scrollTop > this.topOffset)
      );
  }

  scrollToTop(): void {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }
}
