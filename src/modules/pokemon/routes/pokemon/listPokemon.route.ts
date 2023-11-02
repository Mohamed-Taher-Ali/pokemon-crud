import {
  PokemonTypeService,
  PokemonWeatherService,
} from "../../services/pokemonPopulates";
import {
  useFilter,
  usePagination,
  useValidation,
} from "../../../../middlewares";
import { listPokemonValidation } from "../../validations";
import { pokemonService } from "../../services/pokemon";
import { SingleRoute } from "../../../../services";
import { HTTP_METHODS } from "../../../../types";
import { IPokemon } from "../../types";

const routeHandler = async (req, res, next): Promise<void> => {
  const {
    pagination: { offset, limit },
    filterData,
  } = req;

  try {
    const pokemon = new pokemonService(
      new PokemonTypeService(),
      new PokemonWeatherService()
    );

    const docs = await pokemon.list(offset, limit, filterData);

    res.send(docs);
  } catch (error) {
    next(error.toString());
  }
};

export const listPokemonRoute = new SingleRoute(
  HTTP_METHODS.get,
  "/",
  routeHandler,
  [
    useValidation(listPokemonValidation),
    useFilter<keyof IPokemon>([
      "name",
      "pokedexNumber",
      "evolutionStage",
      "type1",
      "familyId",
    ]),
    usePagination(3),
  ]
);
