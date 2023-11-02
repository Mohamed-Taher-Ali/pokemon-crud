import { CreateRouter } from '../../../../services/configRouter/CreateRouter/CreateRouter';
import { deletePokemonRoute } from './deletePokemon.route';
import { editPokemonRoute } from './editPokemon.route';
import { listPokemonRoute } from './listPokemon.route';
import { addPokemonRoute } from './addPokemon.route';
import { getPokemonRoute } from './getPokemon.route';

const pokemonRouterObj = new CreateRouter('/pokemons');
pokemonRouterObj.appendRoute(deletePokemonRoute.routeData);
pokemonRouterObj.appendRoute(editPokemonRoute.routeData);
pokemonRouterObj.appendRoute(listPokemonRoute.routeData);
pokemonRouterObj.appendRoute(addPokemonRoute.routeData);
pokemonRouterObj.appendRoute(getPokemonRoute.routeData);

export const pokemonRouter = pokemonRouterObj.router;
