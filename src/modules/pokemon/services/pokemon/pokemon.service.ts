import { PokemonWeatherService } from '../pokemonPopulates/pokemonWeather.service';
import { PokemonTypeService } from '../pokemonPopulates/pokemonType.service';
import { checkKeyExist } from '../../../../utils';
import { PokemonModel } from '../../models';
import { FilterQuery } from 'mongoose';
import { IName, IPokemon } from '../../types';
import { PokemonPopulateService } from '../pokemonPopulates/pokemonPopulate.service';
import { IFilterData } from 'src/types/express/customRequestAttrs';
import { getPokemonAggregationQuery } from './getPokemonAggregationQuery.helper';

export class pokemonService {
  constructor(
    private typeService: PokemonPopulateService<IName>,
    private weatherService: PokemonPopulateService<IName>
  ) {}

  getPopulatedFields(exclude?: string[]) {
    const fields = ['evolutionStage', 'weather1', 'weather2', 'type1', 'type2'];
    return exclude?.length ? fields.filter(f => !exclude.includes(f)) : fields;
  }

  async add(data: IPokemon) {
    const { name, pokedexNumber, type1, weather1 } = data;
    const [t1, w1, p] = await Promise.all(
      [
        this.typeService.get(type1),
        this.weatherService.get(weather1),
        PokemonModel.findOne({ name, pokedexNumber }),
      ].map(async p => await p)
    );

    if (!t1?._id) throw new Error('type1 is required');
    if (!w1?._id) throw new Error('weather1 is required');
    if (p?._id) throw new Error('name & pokedexNumber are unique');

    return await new PokemonModel(data).save();
  }

  async delete(id: string) {
    await PokemonModel.findByIdAndDelete(id);
  }

  async get(id: string) {
    return await PokemonModel.findById(id).populate(this.getPopulatedFields());
  }

  async list(offset = 0, limit = 10, listFilter?: IFilterData) {
    const { filter, operator } = listFilter;

    const aggregationQuery = getPokemonAggregationQuery({
      populatedFields: this.getPopulatedFields(),
      searchQuery: filter,
      operator,
      offset,
      limit,
    });

    const docs = await PokemonModel.aggregate(aggregationQuery);
    return docs;
  }

  async update(id: string, data: Partial<IPokemon>) {
    if (checkKeyExist(data, 'type1')) {
      const type1 = await this.typeService.get(data.type1!);
      if (!type1?._id) throw new Error('type1 is required');
    }

    if (checkKeyExist(data, 'weather1')) {
      const weather1 = await this.typeService.get(data.weather1!);
      if (!weather1?._id) throw new Error('weather1 is required');
    }

    return await PokemonModel.findByIdAndUpdate(id, data, { new: true }).populate(
      this.getPopulatedFields()
    );
  }
}
