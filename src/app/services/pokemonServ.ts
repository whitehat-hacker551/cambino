import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from '../model/pokemonInterface';
import { PokemonAbility } from '../model/pokemonAbilityInterface';

interface PokemonResponse {
  results: Pokemon[];
  abilities: PokemonAbility[];
}

@Injectable({
  providedIn: 'root'
})
export class PokemonServ {
constructor(private oHttp: HttpClient) { }

  getAllPokemons(): Observable<PokemonResponse> {
    return this.oHttp.get<PokemonResponse>('https://pokeapi.co/api/v2/pokemon?limit=20');
  }
  getPokemonIdByURL(url:string) : number {
        return Number(url.split('/').filter(Boolean).pop());
  }
  getPokemonById(id: number): Observable<PokemonResponse> {
    return this.oHttp.get<PokemonResponse>('https://pokeapi.co/api/v2/pokemon/'+id)
  }
}
