import { PokemonEvolutionStageModelName } from "./PokemonEvolutionStage";
import { PokemonWeatherModelName } from "./PokemonWeather";
import { PokemonTypeModelName } from "./PokemonType";
import { getPokemonActions } from "./actions";
import { model, Schema } from "mongoose";
import { IPokemon } from "../types";

export const PokemonSchema = new Schema<IPokemon<Schema.Types.ObjectId>>(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    pokedexNumber: {
      type: Number,
      required: true,
    },
    imgName: {
      type: String,
      required: true,
    },
    generation: {
      type: Number,
      required: true,
    },
    evolutionStage: {
      type: Schema.Types.ObjectId,
      ref: PokemonEvolutionStageModelName,
    },
    familyId: Number,
    type1: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: PokemonTypeModelName,
    },
    type2: {
      type: Schema.Types.ObjectId,
      ref: PokemonTypeModelName,
    },
    weather1: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: PokemonWeatherModelName,
    },
    weather2: {
      type: Schema.Types.ObjectId,
      ref: PokemonWeatherModelName,
    },
    atk: {
      type: Number,
      required: true,
    },
    def: {
      type: Number,
      required: true,
    },
    sta: {
      type: Number,
      required: true,
    },
    legendary: {
      type: Number,
      required: true,
    },
    aquirable: {
      type: Number,
      required: true,
    },
    raidable: {
      type: Number,
      required: true,
    },
    hatchable: {
      type: Number,
      required: true,
    },

    cp40: {
      type: Number,
      required: true,
    },
    cp39: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

getPokemonActions(PokemonSchema);

export const PokemonModelName = "Pokemon";
export const PokemonModel = model<IPokemon<Schema.Types.ObjectId>>(
  PokemonModelName,
  PokemonSchema
);
