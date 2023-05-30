import { Document, Model, Schema, model, DocumentToObjectOptions } from 'mongoose';

export enum LandType {
  BUILDING = 'BUILDING',
  FACTORY = 'FACTORY',
  HOTEL = 'HOTEL',
  OFFICE = 'OFFICE',
  RESTAUARANT = 'RESTAUARANT',
  SHOP = 'SHOP',
  WAREHOUSE = 'WAREHOUSE',
  OTHER = 'OTHER',
}

export interface ICommercial {
  landType: LandType;
  landSize: number;
}

export interface ICommercialDocument extends ICommercial, Document {
  toJSON(options?: DocumentToObjectOptions): ICommercial;
}

export type ICommercialModel = Model<ICommercialDocument>;

const schema = new Schema({
  landType: { type: String, required: true, enum: Object.values(LandType) },
  landSize: { type: Number, required: true },
});

const Commercial: ICommercialModel = model<ICommercialDocument, ICommercialModel>('Commercial', schema);

export default Commercial;
