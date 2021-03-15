import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-lazy-image',
  templateUrl: './lazy-image.component.html',
  styleUrls: ['./lazy-image.component.scss']
})
export class LazyImageComponent implements OnInit, OnChanges, AfterViewInit  {
  @Input('src') src: string;
  @Input('alt') alt: string;
  @ViewChild('image') image: ElementRef<HTMLImageElement>;
  @ViewChild('blur') blur: ElementRef<HTMLImageElement>;
  loaded: boolean;
  img = './assets/images/ball@2x.png';

  loadImage = new BehaviorSubject(true);
  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges) {
    if('src' in changes && !changes['src'].isFirstChange()) {
      this.img = './assets/images/ball@2x.png';
      this.loadImage.next(true);
    }
  }

  ngAfterViewInit() {
    this.loadImage.subscribe(() => {
        const observer: IntersectionObserver = new IntersectionObserver(
          this.observeElmInView.bind(this),
          {
            threshold: 1.0,
            rootMargin: '100px',
          }
        );

        observer.observe(this.image.nativeElement);
    });
  }

  private observeElmInView(
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (entry.intersectionRatio) {
        entry.target.addEventListener('load', (event: any) => {
          if (event.target.complete) {
            this.img = this.src;
            this.loaded = true;
          }
        });
        //forcing src image on element
        entry.target['src'] = this.src;
        this.blur.nativeElement.src = this.src;
        observer.unobserve(entry.target);
      }
    });
  }
}
