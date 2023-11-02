import { PokemonModel } from "../../modules/pokemon/models";
import { IPokemon } from "../../modules/pokemon/types";
import { getUniqueArray } from "../../utils";
import { models } from "mongoose";

export const seedPokemonModel = async (data: IPokemon[]) => {
  try {
    await PokemonModel.insertMany(data);
  } catch (error) {
    console.log({ error });
  }
};

export const insertManyIfNotExist = async (
  modelName,
  values: string[],
  name
) => {
  const model = models[modelName];

  const existDocs = (await model.find({ [name]: { $in: values } })).reduce(
    (fields, { _id, name }) => ({
      [name]: _id,
      ...fields,
    }),
    {}
  );

  const outValues = getUniqueArray(values, true)
    .filter((v) => !existDocs[v])
    .map((o) => ({ [name]: o }));

  const outDocs =
    outValues?.length &&
    (await model.create(outValues)).reduce(
      (fields, { _id, name }) => ({
        [name]: _id,
        ...fields,
      }),
      {}
    );

  return { ...existDocs, ...outDocs };
};
