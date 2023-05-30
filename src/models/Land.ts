import { Document, Model, Schema, model, DocumentToObjectOptions } from 'mongoose';

export enum LandType {
  AGRICULTURAL = 'AGRICULTURAL',
  COMMERTIAL = 'COMMERTIAL',
  RESIDENTIAL = 'RESIDENTIAL',
  OTHER = 'OTHER',
}

export interface ILand {
  landType: LandType;
  landSize: number;
}

export interface ILandDocument extends ILand, Document {
  toJSON(options?: DocumentToObjectOptions): ILand;
}

export type ILandModel = Model<ILandDocument>;

const schema = new Schema({
  landType: { type: String, required: true, enum: Object.values(LandType) },
  landSize: { type: Number, required: true },
});

const Land: ILandModel = model<ILandDocument, ILandModel>('Land', schema);

export default Land;
