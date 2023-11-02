import {
  PokemonTypeService,
  PokemonWeatherService,
} from "../../services/pokemonPopulates";
import { getPokemonValidation } from "../../validations";
import { pokemonService } from "../../services/pokemon";
import { useValidation } from "../../../../middlewares";
import { SingleRoute } from "../../../../services";
import { HTTP_METHODS } from "../../../../types";

const routeHandler = async (req, res, next): Promise<void> => {
  const {
    params: { id },
  } = req;

  try {
    const pokemon = new pokemonService(
      new PokemonTypeService(),
      new PokemonWeatherService()
    );

    const doc = await pokemon.get(id);

    res.send(doc);
  } catch (error) {
    next(error.toString());
  }
};

export const getPokemonRoute = new SingleRoute(
  HTTP_METHODS.get,
  "/:id",
  routeHandler,
  [useValidation(getPokemonValidation)]
);
