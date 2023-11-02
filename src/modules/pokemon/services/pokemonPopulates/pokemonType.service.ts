import { PokemonPopulateService } from './pokemonPopulate.service';
import { PokemonTypeModelName } from '../../models';
import { IName } from '../../types';

export class PokemonTypeService extends PokemonPopulateService<IName> {
  constructor() {
    super(PokemonTypeModelName);
  }
}
