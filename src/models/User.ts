import { Document, Model, Schema, model, DocumentToObjectOptions } from 'mongoose';

import config from '../config/config';
import { Password } from '../services/password';

const passwordService = new Password(config);

export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  OPERATIONAL_ADMIN = 'OPERATIONAL_ADMIN',
  GENERAL = 'GENERAL',
  BROKER = 'BROKER',
}

export interface IUser {
  email: string;
  password: string;
  role: UserRole;
  name: string;
  number: string;
  location: string;
  nic: string;
  isVerified: boolean;
  isWhatsapp: boolean;
}

export interface IUserDocument extends IUser, Document {
  comparePassword(password: string): Promise<boolean>;
  toJSON(options?: DocumentToObjectOptions): Omit<IUser, 'password'>;
}

export type IUserModel = Model<IUserDocument>;

const schema = new Schema<IUserDocument>(
  {
    email: { type: String, required: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: Object.values(UserRole) },
    name: { type: String, required: true },
    number: { type: String, required: true, unique: true, trim: true },
    location: { type: String, required: true, trim: true },
    nic: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    isWhatsapp: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc: IUserDocument, ret: IUser): Omit<IUser, 'password'> => {
        delete ret.password;
        return ret;
      },
    },
  },
);

schema.pre<IUserDocument>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const password = this.get('password');
  const hash = await passwordService.hashPassword(password);
  this.set('password', hash);
  next();
});

schema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return await passwordService.comparePassword(password, this.password);
};

const User: IUserModel = model<IUserDocument, IUserModel>('User', schema);

export default User;
