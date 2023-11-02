import {
  PokemonTypeService,
  PokemonWeatherService,
} from "../../services/pokemonPopulates";
import { HTTP_METHODS, RequestHandler } from "../../../../types";
import { deletePokemonValidation } from "../../validations";
import { pokemonService } from "../../services/pokemon";
import { useValidation } from "../../../../middlewares";
import { SingleRoute } from "../../../../services";

const routeHandler: RequestHandler = async (req, res, next): Promise<void> => {
  const {
    params: { id },
  } = req;
  try {
    const pokemon = new pokemonService(
      new PokemonTypeService(),
      new PokemonWeatherService()
    );

    const doc = await pokemon.delete(id);

    res.send(doc);
  } catch (error) {
    next(error.toString());
  }
};

export const deletePokemonRoute = new SingleRoute(
  HTTP_METHODS.delete,
  "/:id",
  routeHandler,
  [useValidation(deletePokemonValidation)]
);
