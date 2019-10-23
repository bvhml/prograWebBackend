import mongoose, { Schema, Document } from 'mongoose';
import { IName, IId } from '@entities';


export interface IContactModel extends Document {
    pk: Number;
    name: IName;
    email: String;
    id: IId;
    nat: String;
    gen: String;
  }

const ContactSchema: Schema = new Schema({

  pk: { type: Number, required: true, unique: true },
  name: { type: Object, required: true },
  email: { type: String, required: true },
  id: { type: Object, required: true },
  nat: { type: String, required: true },
  gen: { type: String, required: true }
});

export default mongoose.model<IContactModel>('Contact', ContactSchema);