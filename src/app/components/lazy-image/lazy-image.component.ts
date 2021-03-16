import { Component, Input, OnInit } from '@angular/core';
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
