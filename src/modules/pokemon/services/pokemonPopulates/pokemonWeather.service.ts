import { PokemonPopulateService } from './pokemonPopulate.service';
import { PokemonWeatherModelName } from '../../models';
import { IName } from '../../types';

export class PokemonWeatherService extends PokemonPopulateService<IName> {
  constructor() {
    super(PokemonWeatherModelName);
  }
}
