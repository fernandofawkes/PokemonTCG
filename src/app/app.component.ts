import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit{
  title = 'PokemonTCG';
  showLoading$: any;

  constructor(private loading: LoadingService){

  }

  ngOnInit(){
    this.showLoading$ = this.loading.loading$;
  }
}
