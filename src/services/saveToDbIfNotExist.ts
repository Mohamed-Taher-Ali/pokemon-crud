import { FilterQuery, Model } from 'mongoose';

export const saveToDbIfNotExist = async <IModelData>(
  model: Model<IModelData>,
  uniqueFields: Array<keyof IModelData>,
  data: IModelData
) => {
  const filter = uniqueFields.reduce((fields, f) => ({ ...fields, [f]: data[f] }), {});
  const existDoc = await model.findOne({ ...filter } as FilterQuery<IModelData>);

  if (existDoc) return existDoc;
  return await new model(data).save();
};
