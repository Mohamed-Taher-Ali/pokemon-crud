import {
  PokemonTypeService,
  PokemonWeatherService,
} from "../../services/pokemonPopulates";
import { SingleRoute } from "../../../../services/configRouter/SingleRoute/SingleRoute";
import { HTTP_METHODS, RequestHandler } from "../../../../types";
import { addPokemonValidation } from "../../validations";
import { useValidation } from "../../../../middlewares";
import { pokemonService } from "../../services/pokemon";

const routeHandler: RequestHandler = async (req, res, next) => {
  const { body } = req;

  try {
    const pokemon = new pokemonService(
      new PokemonTypeService(),
      new PokemonWeatherService()
    );

    const doc = await pokemon.add(body);

    res.send(doc);
  } catch (error) {
    next(error.toString());
  }
};

export const addPokemonRoute = new SingleRoute(
  HTTP_METHODS.post,
  "/",
  routeHandler,
  [useValidation(addPokemonValidation)]
);
