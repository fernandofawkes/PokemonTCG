import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iif, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonTCGService {

  constructor(private http: HttpClient) { }

  getCards(query: string = '') {
    return this.http.get(`/cards?${query}`);
  }

  getCard(id: string) {
    return iif(() => !id.length, 
      throwError({message: 'no id parameter provided'}),
      this.http.get(`/cards/${id}`)
    );
  }
}
