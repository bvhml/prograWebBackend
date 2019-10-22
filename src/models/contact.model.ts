import mongoose, { Schema, Document } from 'mongoose';


export interface IContact extends Document {
    pk: Number;
    name: string;
    email: string;
    id: string;
    nat: string;
    gen: string;
  }

const ContactSchema: Schema = new Schema({

  pk: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  id: { type: String, required: true },
  nat: { type: String, required: true },
  gen: { type: String, required: true }
});

export default mongoose.model<IContact>('Contact', ContactSchema);