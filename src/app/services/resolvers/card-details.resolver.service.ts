import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { PokemonTCGService } from "../pokemon-tcg.service";

@Injectable({
  providedIn: 'root'
})
export class DetailsResolver implements Resolve<any> {
  
  constructor(private tcgService: PokemonTCGService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.tcgService.getCard(route.paramMap.get('id'));
  }
}
