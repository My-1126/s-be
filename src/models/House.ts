import { Document, Model, Schema, model, DocumentToObjectOptions } from 'mongoose';

export interface IHouse {
  bedroom: number;
  bathroom: number;
  landSize: number;
  homeSize: number;
}

export interface IHouseDocument extends IHouse, Document {
  toJSON(options?: DocumentToObjectOptions): IHouse;
}

export type IHouseModel = Model<IHouseDocument>;

const schema = new Schema({
  bedroom: { type: Number, required: true },
  bathroom: { type: Number, required: true },
  landSize: { type: Number, required: true },
  homeSize: { type: Number, required: true },
});

const House: IHouseModel = model<IHouseDocument, IHouseModel>('House', schema);

export default House;
