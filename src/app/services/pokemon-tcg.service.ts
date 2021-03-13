import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iif, of, throwError } from 'rxjs';
import { concatMap, expand, map, toArray  } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonTCGService {

  constructor(private http: HttpClient) { }

  getAllCards(query: string = '', page = 1) {
    return this.getCardsPage(query,page).pipe(
      expand(({nextPage}) => nextPage ? this.getCardsPage(query, nextPage) : of()),
      concatMap(({cards})=> cards),
      toArray()
    )
  }

  getCardsPage(query: string, page = 1) {
    console.log(`Called for page ${page}`);
    const params = [query,`page=${page}`];
    return this.http.get<ApiResponse>(`/cards?${params.join('&')}`).pipe(
      map(response => ({
        cards: response.data,
        nextPage: response.count < response.pageSize || ++page === Math.ceil(response.count/response.totalCount) ? undefined : page
      }))
    );
  }

  getCard(id: string) {
    return iif(() => !id.length, 
      throwError({message: 'no id parameter provided'}),
      this.http.get(`/cards/${id}`)
    );
  }
}
