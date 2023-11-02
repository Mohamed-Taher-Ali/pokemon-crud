import {
  PokemonTypeService,
  PokemonWeatherService,
} from "../../services/pokemonPopulates";
import { HTTP_METHODS, RequestHandler } from "../../../../types";
import { editPokemonValidation } from "../../validations";
import { pokemonService } from "../../services/pokemon";
import { useValidation } from "../../../../middlewares";
import { SingleRoute } from "../../../../services";

const routeHandler: RequestHandler = async (req, res, next): Promise<void> => {
  const {
    body,
    params: { id },
  } = req;

  try {
    const pokemon = new pokemonService(
      new PokemonTypeService(),
      new PokemonWeatherService()
    );

    const doc = await pokemon.update(id, body);

    res.send(doc);
  } catch (error) {
    next(error.toString());
  }
};

export const editPokemonRoute = new SingleRoute(
  HTTP_METHODS.put,
  "/:id",
  routeHandler,
  [useValidation(editPokemonValidation)]
);
