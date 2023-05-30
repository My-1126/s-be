import { Document, Model, Schema, model, DocumentToObjectOptions } from 'mongoose';

export enum LandType {
  AGRICULTURAL = 'AGRICULTURAL',
  COMMERTIAL = 'COMMERTIAL',
  RESIDENTIAL = 'RESIDENTIAL',
  OTHER = 'OTHER',
}

export interface IApartment {
  landType: LandType;
  landSize: number;
}

export interface IApartmentDocument extends IApartment, Document {
  toJSON(options?: DocumentToObjectOptions): IApartment;
}

export type IApartmentModel = Model<IApartmentDocument>;

const schema = new Schema({
  landType: { type: String, required: true, enum: Object.values(LandType) },
  landSize: { type: Number, required: true },
});

const Apartment: IApartmentModel = model<IApartmentDocument, IApartmentModel>('Apartment', schema);

export default Apartment;
