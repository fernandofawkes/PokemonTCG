import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { Subject } from "rxjs";
import { delay, filter } from "rxjs/operators";

@Directive({
  selector: '[detectVisibility]',
})
export class DetectVisibilityDirective
  implements OnDestroy, OnInit, AfterViewInit {
  @Input() threshold = 1;

  @Output() visible = new EventEmitter<HTMLElement>();

  private observer: IntersectionObserver | undefined;
  private subject$ = new Subject<{
    entry: IntersectionObserverEntry;
    observer: IntersectionObserver;
  }>();

  constructor(private element: ElementRef) {}

  ngOnInit() {
    this.createObserver();
  }

  ngAfterViewInit() {
    this.bindObserver();
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = undefined;
    }

    this.subject$.next();
    this.subject$.complete();
  }

  private createObserver() {
    const options = {
      rootMargin: '100px',
      threshold: this.threshold,
    };

    const isIntersecting = (entry: IntersectionObserverEntry) =>
      entry.isIntersecting || entry.intersectionRatio > 0;

    this.observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (isIntersecting(entry)) {
          this.subject$.next({ entry, observer });
        }
      });
    }, options);
  }

  private bindObserver() {
    if (!this.observer) {
      return;
    }

    this.observer.observe(this.element.nativeElement);

    this.subject$
      .subscribe(({ entry, observer }) => {
        const target = entry.target as HTMLElement;

          this.visible.emit(target);
          observer.unobserve(target);

      });
  }
}