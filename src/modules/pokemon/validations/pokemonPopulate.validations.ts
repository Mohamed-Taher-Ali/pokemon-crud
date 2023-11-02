import { PopulatesModules } from '../routes';
import { Request } from 'express';
import joi from 'joi';

const pokemonPopulateAllFields = {
  name: joi.string().required(),
  module: joi
    .string()
    .required()
    .valid(...Object.values(PopulatesModules || {})),
};

export const addPokemonPopulateValidation = (req: Request) => {
  const schema = joi.object(pokemonPopulateAllFields);
  const validation = schema.validate({ ...req.body, ...req.params });

  return validation?.error?.details?.[0]?.message;
};

export function getPokemonPopulateValidation(req: Request) {
  const schema = joi.object({
    id: joi.string().length(24).required(),
    module: pokemonPopulateAllFields.module,
  });

  const validation = schema.validate(req.params);
  return validation?.error?.details?.[0]?.message;
}

export function editPokemonPopulateValidation(req: Request) {
  const schema = joi.object({
    ...pokemonPopulateAllFields,
    id: joi.string().length(24).required(),
  });

  const validation = schema.validate({ ...req.body, ...req.params });
  return validation?.error?.details?.[0]?.message;
}

export function listPokemonPopulateValidation(req: Request) {
  const schema = joi.object({
    module: joi
      .string()
      .required()
      .valid(...Object.values(PopulatesModules || {})),
    page: joi.number().optional().min(1),
  });

  const validation = schema.validate({ ...req.query, ...req.params });
  return validation?.error?.details?.[0]?.message;
}
