import { BinaryType } from '../../../types';

export interface IPokemon<T = string> {
  name: string;
  pokedexNumber: number;
  imgName: string;
  generation: number;
  evolutionStage?: T;
  evolved: BinaryType;
  familyId?: number;
  crossGen: BinaryType;
  type1: T;
  type2?: T;
  weather1: T;
  weather2?: T;
  statTotal: number;
  atk: number;
  def: number;
  sta: number;
  legendary: BinaryType;
  aquirable: BinaryType;
  spawns: BinaryType;
  regional: BinaryType;
  raidable: BinaryType;
  hatchable: number;
  shiny: BinaryType;
  nest: BinaryType;
  new: BinaryType;
  notGettable: BinaryType;
  futureEvolve: BinaryType;
  cp40: number;
  cp39: number;
}
