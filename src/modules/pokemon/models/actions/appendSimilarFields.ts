import { IPokemon } from "../../types";

const reduceFunc = (fields: object, name: string) => ({
  ...fields,
  [name]: {
    type: Number,
    required: true,
    enum: [0, 1],
  },
});

export const appendSimilarFields = () => {
  const fields: Array<keyof IPokemon> = [
    "evolved",
    "crossGen",
    "spawns",
    "regional",
    "shiny",
    "nest",
    "new",
    "notGettable",
    "futureEvolve",
  ];

  return fields.reduce(reduceFunc, {});
};
