import { model, Schema } from 'mongoose';
import { IName } from '../types';

export const PokemonWeatherSchema = new Schema<IName>({
  name: {
    type: String,
    unique: true,
    required: true,
  },
});

export const PokemonWeatherModelName = 'PokemonWeather';
export const PokemonWeatherModel = model<IName>(PokemonWeatherModelName, PokemonWeatherSchema);
