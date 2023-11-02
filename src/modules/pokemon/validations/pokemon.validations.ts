import { Request } from "express";
import joi from "joi";

const pokemonAllFields = {
  name: joi.string().required(),
  pokedexNumber: joi.number().required(),
  imgName: joi.string().required(),
  generation: joi.number().required(),
  evolutionStage: joi.string().length(24).optional(),
  evolved: joi.number().required().valid(0, 1),
  familyId: joi.number().optional(),
  crossGen: joi.number().required().valid(0, 1),
  type1: joi.string().length(24).required(),
  type2: joi.string().length(24).optional(),
  weather1: joi.string().length(24).required(),
  weather2: joi.string().length(24).optional(),
  atk: joi.number().required(),
  def: joi.number().required(),
  sta: joi.number().required(),
  legendary: joi.number().required(),
  aquirable: joi.number().required(),
  spawns: joi.number().required().valid(0, 1),
  regional: joi.number().required().valid(0, 1),
  raidable: joi.number().required(),
  hatchable: joi.number().required(),
  shiny: joi.number().required().valid(0, 1),
  nest: joi.number().required().valid(0, 1),
  new: joi.number().required().valid(0, 1),
  notGettable: joi.number().required().valid(0, 1),
  futureEvolve: joi.number().required().valid(0, 1),
  cp40: joi.number().required(),
  cp39: joi.number().required(),
};

export function addPokemonValidation(req: Request) {
  const schema = joi.object(pokemonAllFields);

  const validation = schema.validate(req.body);
  return validation?.error?.details?.[0]?.message;
}

export function deletePokemonValidation(req: Request) {
  const schema = joi.object({
    id: joi.string().length(24).required(),
  });

  const validation = schema.validate(req.params);
  return validation?.error?.details?.[0]?.message;
}

export function getPokemonValidation(req: Request) {
  const schema = joi.object({
    id: joi.string().length(24).required(),
  });

  const validation = schema.validate(req.params);
  return validation?.error?.details?.[0]?.message;
}

export function editPokemonValidation(req: Request) {
  const schema = joi.object({
    id: joi.string().length(24).required(),

    ...Object.entries(pokemonAllFields).reduce(
      (fields, [key, joiObj]) => ({
        [key]: joiObj.optional(),
        ...fields,
      }),
      {}
    ),
  });

  const validation = schema.validate({ ...req.query, id: req.params.id });
  return validation?.error?.details?.[0]?.message;
}

export function listPokemonValidation(req: Request) {
  const schema = joi.object({
    page: joi.number().optional(),

    ...Object.entries(pokemonAllFields).reduce(
      (fields, [key, joiObj]) => ({
        [key]: joiObj.optional(),
        ...fields,
      }),
      {}
    ),
    filterOperator: joi.string().optional().valid("and", "or"),
    evolutionStage: joi.string().optional(),
    type1: joi.string().optional(),
  });

  const validation = schema.validate(req.query);
  return validation?.error?.details?.[0]?.message;
}
