import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-lazy-image',
  templateUrl: './lazy-image.component.html',
  styleUrls: ['./lazy-image.component.scss']
})
export class LazyImageComponent implements OnInit  {
  @Input('src') src: string;
  @Input('alt') alt: string;
  img = './assets/images/ball@2x.png';

  constructor() { }

  ngOnInit(): void {
  }
  changeSrc() {
    this.img = this.src;
  }  
}
