import {
  mapPopulateNameToService,
  validateModuleName,
} from "../../services/pokemonPopulates/mapPopulateNameToService.helper";
import { PokemonPopulateService } from "../../services/pokemonPopulates/pokemonPopulate.service";
import { addPokemonPopulateValidation } from "../../validations";
import { HTTP_METHODS, RequestHandler } from "../../../../types";
import { useValidation } from "../../../../middlewares";
import { SingleRoute } from "../../../../services";
import { PopulatesModules } from ".";
import { IName } from "../../types";

const routeHandler: RequestHandler = async (req, res, next): Promise<void> => {
  const {
    body,
    params: { module },
  } = req;

  try {
    const populateServiceClass = mapPopulateNameToService(
      module as PopulatesModules
    );

    const populateService: PokemonPopulateService<IName> =
      new populateServiceClass();

    const resp = await populateService.add("name", body);

    res.send(resp);
  } catch (error) {
    next(error.toString());
  }
};

export const addPokemonPopulateRoute = new SingleRoute(
  HTTP_METHODS.post,
  "/",
  routeHandler,
  [
    useValidation(validateModuleName),
    useValidation(addPokemonPopulateValidation),
  ]
);
