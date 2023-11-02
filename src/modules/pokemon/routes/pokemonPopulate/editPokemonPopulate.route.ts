import {
  mapPopulateNameToService,
  validateModuleName,
} from "../../services/pokemonPopulates";
import { PokemonPopulateService } from "../../services/pokemonPopulates/pokemonPopulate.service";
import { editPokemonPopulateValidation } from "../../validations";
import { HTTP_METHODS, RequestHandler } from "../../../../types";
import { useValidation } from "../../../../middlewares";
import { SingleRoute } from "../../../../services";
import { PopulatesModules } from ".";
import { IName } from "../../types";

const routeHandler: RequestHandler = async (req, res, next): Promise<void> => {
  const {
    body,
    params: { module, id },
  } = req;

  try {
    const populateServiceClass = mapPopulateNameToService(
      module as PopulatesModules
    );

    const populateService: PokemonPopulateService<IName> =
      new populateServiceClass();

    const resp = await populateService.update(id, body);

    res.send(resp);
  } catch (error) {
    next(error.toString());
  }
};

export const editPokemonPopulateRoute = new SingleRoute(
  HTTP_METHODS.put,
  "/:id",
  routeHandler,
  [
    useValidation(validateModuleName),
    useValidation(editPokemonPopulateValidation),
  ]
);
