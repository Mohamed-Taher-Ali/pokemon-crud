import { saveToDbIfNotExist } from "../../../../services";
import { models, Model, FilterQuery } from "mongoose";

export class PokemonPopulateService<IModelData = {}> {
  private model: Model<IModelData>;

  constructor(modelName: string) {
    this.model = models[modelName];
  }

  private async addIfNoExist(name: keyof IModelData, data: IModelData) {
    return saveToDbIfNotExist(this.model, [name], data);
  }

  async add(name: keyof IModelData, data: IModelData) {
    return this.addIfNoExist(name, data);
  }

  async get(id: string) {
    return await this.model.findById(id);
  }

  async update(id: string, data: Partial<IModelData>) {
    return await this.model.findByIdAndUpdate(id, { ...data }, { new: true });
  }

  async list(offset = 0, limit = 10, filter?: FilterQuery<IModelData>) {
    return await this.model
      .find({ ...filter })
      .skip(offset)
      .limit(limit)
      .sort("-_id");
  }
}
