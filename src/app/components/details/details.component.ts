import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Card } from 'src/app/models/Card';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  details: Card;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.details = this.route.snapshot.data['cardData'];

  }

}
