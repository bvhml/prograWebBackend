import mongoose, { Schema, Document } from 'mongoose';
import { IName, IId, IPicture } from '@entities';


export interface IContactModel extends Document {
    pk: Number;
    name: IName;
    email: String;
    id: IId;
    picture: IPicture;
    nat: String;
    gen: String;
  }

const ContactSchema: Schema = new Schema({

  pk: { type: Number, required: false, unique: true },
  name: { type: Object, required: false },
  email: { type: String, required: false },
  id: { type: Object, required: false },
  picture: { type: Object, required: false },
  nat: { type: String, required: false },
  gen: { type: String, required: false }
});

export default mongoose.model<IContactModel>('Contact', ContactSchema);