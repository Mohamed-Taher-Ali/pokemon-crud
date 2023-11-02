import { PokemonPopulateService } from './pokemonPopulate.service';
import { PokemonEvolutionStageModelName } from '../../models';
import { IName } from '../../types';

export class PokemonEvolutionStageService extends PokemonPopulateService<IName> {
  constructor() {
    super(PokemonEvolutionStageModelName);
  }
}
