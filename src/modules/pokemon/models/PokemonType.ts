import { model, Schema } from 'mongoose';
import { IName } from '../types';

export const PokemonTypeSchema = new Schema<IName>({
  name: {
    type: String,
    unique: true,
    required: true,
  },
});

export const PokemonTypeModelName = 'PokemonType';
export const PokemonTypeModel = model<IName>(PokemonTypeModelName, PokemonTypeSchema);
