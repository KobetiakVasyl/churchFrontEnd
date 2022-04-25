import {Component, Input, OnInit} from '@angular/core';
import {debounceTime, fromEvent, map, merge, Observable, startWith, take} from "rxjs";

@Component({
  selector: 'app-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.scss']
})
export class ScrollToTopComponent implements OnInit {
  @Input() startScrollOffset = 100;
  @Input() buttonRightPosition = '1.5rem';

  private readonly hiddenButtonRightPosition = '-100%';

  buttonRightPosition$!: Observable<string>;

  ngOnInit(): void {
    const scroll$ = fromEvent(document, 'scroll');

    this.buttonRightPosition$ = merge(
      scroll$.pipe(startWith(() => 0), take(1)),
      scroll$.pipe(debounceTime(500))
    )
      .pipe(
        map(() => (
          document.body.scrollTop > this.startScrollOffset ||
          document.documentElement.scrollTop > this.startScrollOffset
            ? this.buttonRightPosition
            : this.hiddenButtonRightPosition
        ))
      );
  }

  scrollToTop(): void {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }
}
