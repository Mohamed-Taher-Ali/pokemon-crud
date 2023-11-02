import { IPokemon } from '../../types';
import { appendSimilarFields } from './appendSimilarFields';
import { getStatTotal } from './getStatTotal';
import { Schema } from 'mongoose';

type GetPokemonActionsParams = Schema<IPokemon<Schema.Types.ObjectId>>;

export const getPokemonActions = (schema: GetPokemonActionsParams) => {
  schema.virtual('statTotal' as keyof IPokemon).get(getStatTotal);
  schema.add(appendSimilarFields());
};
