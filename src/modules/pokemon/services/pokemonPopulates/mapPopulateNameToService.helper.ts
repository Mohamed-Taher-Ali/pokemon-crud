import { PokemonEvolutionStageService } from './pokemonEvolutionStage.service';
import { PokemonWeatherService } from './pokemonWeather.service';
import { PokemonTypeService } from './pokemonType.service';
import { PopulatesModules } from '../../routes';
import { Request } from 'express';

export const validateModuleName = (req: Request) => {
  const { module } = req.params;
  const isCorrectModuleName = Object.values(PopulatesModules).includes(module as PopulatesModules);

  if (!isCorrectModuleName) return 'path error check it then try again';
};

export const mapPopulateNameToService = (moduleName: PopulatesModules) => {
  switch (moduleName) {
    case PopulatesModules.evolutionStages:
      return PokemonEvolutionStageService;
    case PopulatesModules.weathers:
      return PokemonWeatherService;
    case PopulatesModules.types:
      return PokemonTypeService;

    default:
      return;
  }
};
