import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Pokemon } from '../../model/pokemonInterface';
import { PokemonServ } from '../../services/pokemonServ';
import { PokemonAbility } from '../../model/pokemonAbilityInterface';
@Component({
  selector: 'app-pokemon-list',
  imports: [],
  templateUrl: "./pokemonList.html",
  styleUrl: './pokemonList.css',
})
export class PokemonList { 
  pokemons :Pokemon[]=[];
  pokemonAbilities:PokemonAbility[]=[];
  showAbilities = false;
  selectedPokemonId: number | null = null; 

  oPokemonServ = inject(PokemonServ);

  ngOnInit() {
    this.getPokemons();
  }

  getPokemons() {
    this.oPokemonServ.getAllPokemons().subscribe(response=> {
      this.pokemons=response.results;
    });
  }
  getPokemonsAbility(id:number) {
    this.oPokemonServ.getPokemonById(id).subscribe(response=> {
      this.pokemonAbilities=response.abilities;
    });
}
handleClick(pokemon: Pokemon){
 const id=Number(this.oPokemonServ.getPokemonIdByURL(pokemon.url));
  if (this.selectedPokemonId === id) {
      this.selectedPokemonId = null;
      this.showAbilities = false;
      this.pokemonAbilities = [];
      return;
    }
  this.selectedPokemonId = id;
  this.showAbilities = true;
  this.getPokemonsAbility(this.selectedPokemonId);
}
}
