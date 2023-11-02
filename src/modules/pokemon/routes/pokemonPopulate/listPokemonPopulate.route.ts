import { PokemonPopulateService } from "../../services/pokemonPopulates/pokemonPopulate.service";
import {
  mapPopulateNameToService,
  validateModuleName,
} from "../../services/pokemonPopulates";
import { usePagination, useValidation } from "../../../../middlewares";
import { listPokemonPopulateValidation } from "../../validations";
import { SingleRoute } from "../../../../services";
import { HTTP_METHODS } from "../../../../types";
import { NextFunction, Request, Response } from "express";
import { PopulatesModules } from ".";
import { IName } from "../../types";

const routeHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const {
    params: { module },
    pagination: { offset, limit },
  } = req;

  try {
    const populateServiceClass = mapPopulateNameToService(
      module as PopulatesModules
    );
    const populateService: PokemonPopulateService<IName> =
      new populateServiceClass();
    const resp = await populateService.list(offset, limit);

    res.send(resp);
  } catch (error) {
    next(error.toString());
  }
};

export const listPokemonPopulateRoute = new SingleRoute(
  HTTP_METHODS.get,
  "/",
  routeHandler,
  [
    usePagination(3),
    useValidation(validateModuleName),
    useValidation(listPokemonPopulateValidation),
  ]
);
