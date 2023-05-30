import { Document, Model, Schema, model, DocumentToObjectOptions } from 'mongoose';

export enum PropertyCategory {
  HOUSE = 'HOUSE',
  LAND = 'LAND',
  COMMERTIAL = 'COMMERTIAL',
  APARTMENT = 'APARTMENT',
}

export enum PropertyType {
  SALE = 'SALE',
  RENT = 'RENT',
}

export interface IContact {
  number: string;
  isWhatsapp: boolean;
}

export interface IProperty {
  title: string;
  description: string;
  type: PropertyType;
  category: PropertyCategory;
  price: number;
  contact: IContact[];
  additionalInfoId: string;
}

export interface IPropertyDocument extends IProperty, Document {
  toJSON(options?: DocumentToObjectOptions): IProperty;
}

export type IPropertyModel = Model<IPropertyDocument>;

const schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true, enum: Object.values(PropertyType) },
  category: { type: String, required: true, enum: Object.values(PropertyCategory) },
  price: { type: Number, required: true },
  contact: [
    {
      number: {
        type: String,
        required: true,
        trim: true,
      },
      isWhatsapp: {
        type: Boolean,
        required: true,
      },
    },
  ],
  additionalInfoId: { type: Schema.Types.ObjectId, ref: 'House', required: true },
});

const Property: IPropertyModel = model<IPropertyDocument, IPropertyModel>('Property', schema);

export default Property;
