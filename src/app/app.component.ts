import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'PokemonTCG';
  showLoading$: any;

  constructor(private loading: LoadingService){
    this.showLoading$ = this.loading.loading$;

  }
}
