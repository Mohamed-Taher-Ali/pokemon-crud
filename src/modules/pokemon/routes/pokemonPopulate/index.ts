import { CreateRouter } from '../../../../services/configRouter/CreateRouter/CreateRouter';
import { editPokemonPopulateRoute } from './editPokemonPopulate.route';
import { listPokemonPopulateRoute } from './listPokemonPopulate.route';
import { addPokemonPopulateRoute } from './addPokemonPopulate.route';
import { getPokemonPopulateRoute } from './getPokemonPopulate.route';

export enum PopulatesModules {
  evolutionStages = 'evolutionStages',
  weathers = 'weathers',
  types = 'types',
}

const populatesRouter = new CreateRouter('/pokemon-populates/:module');
populatesRouter.appendRoute(editPokemonPopulateRoute.routeData);
populatesRouter.appendRoute(listPokemonPopulateRoute.routeData);
populatesRouter.appendRoute(addPokemonPopulateRoute.routeData);
populatesRouter.appendRoute(getPokemonPopulateRoute.routeData);

export const pokemonPopulatesRouter = populatesRouter.router;
