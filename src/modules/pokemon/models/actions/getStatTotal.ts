import { IPokemon } from '../../types';

export function getStatTotal(this: IPokemon) {
  const { atk = 0, def = 0, sta = 0 } = this;

  return atk + def + sta;
}
