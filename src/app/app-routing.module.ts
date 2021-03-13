import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsComponent } from './components/details/details.component';
import { ResultsComponent } from './components/results/results.component';
import { DetailsResolver } from './services/resolvers/card-details.resolver.service';

const routes: Routes = [
  {path: 'results', component: ResultsComponent },
  {path: 'card/:id', component: DetailsComponent, resolve: { cardData: DetailsResolver } },
  {path: '**', redirectTo: '/results'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
