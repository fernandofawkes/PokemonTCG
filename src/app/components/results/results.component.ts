import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, pluck, switchMap } from 'rxjs/operators';
import { PokemonTCGService } from 'src/app/services/pokemon-tcg.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  cards$;
  constructor(private tcgService: PokemonTCGService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.cards$ = this.route.queryParams.pipe(
      pluck('q'),
      switchMap((query) => this.tcgService.getAllCards(query ? `q=name:${query}*` : ''))
     ).pipe(map(cards => {
      return cards.sort((a,b) => (a.name).localeCompare(b.name));
    }));
  }
  
  identifyCard(item, index: number){
    return item.id;
  }
}
