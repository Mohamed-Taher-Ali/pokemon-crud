import { model, Schema } from 'mongoose';
import { IName } from '../types';

export const PokemonEvolutionStageSchema = new Schema<IName>({
  name: {
    type: String,
    unique: true,
    required: true,
  },
});

export const PokemonEvolutionStageModelName = 'PokemonEvolutionStage';
export const PokemonEvolutionStageModel = model<IName>(
  PokemonEvolutionStageModelName,
  PokemonEvolutionStageSchema
);
