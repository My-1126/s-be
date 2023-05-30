import { Document, Model, Schema, model, DocumentToObjectOptions } from 'mongoose';

export interface INumberOTPVerification {
  userId: string;
  otp: string;
}

export interface INumberOTPVerificationDocument extends INumberOTPVerification, Document {
  toJSON(options?: DocumentToObjectOptions): INumberOTPVerification;
}

export type INumberOTPVerificationModel = Model<INumberOTPVerificationDocument>;

const schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  otp: { type: String, required: true },
});

const NumberOTPVerification: INumberOTPVerificationModel = model<
  INumberOTPVerificationDocument,
  INumberOTPVerificationModel
>('NumberOTPVerification', schema);

export default NumberOTPVerification;
