import Contact, { IContactModel } from '../models/contact.model';
import { IContact } from '@entities';
interface ICreateContactInput {
  pk: IContactModel['pk'];
  email: IContactModel['email'];
  name: IContactModel['name'];
  id: IContactModel['id'];
  picture: IContactModel['picture'];
  nat: IContactModel['nat'];
  gen: IContactModel['gen'];
}

async function CreateContact({
  pk,
  email,
  name,
  id,
  picture,
  nat,
  gen
}: ICreateContactInput): Promise<IContactModel> {
  return Contact.create({
    pk,
    email,
    name,
    id,
    picture,
    nat,
    gen
  })
    .then((data: IContactModel) => {
      Contact.find({ _id: data._id }, null, { limit: 1 })
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
}
async function FindContacts(): Promise<Array<IContactModel>> {
  return Contact.find(/*{ email: 'flor@example.com' }, null,{ limit: 2 }*/)
    .then(contacts => {
      return contacts;
    })
    .catch((error: Error) => {
      throw error;
    });
}

async function FindContactByPk(pk: String): Promise<IContactModel> {
  return Contact.find({ _id: pk }, null,/*{ limit: 2 }*/)
    .then(contacts => {
      return contacts[0];
    })
    .catch((error: Error) => {
      throw error;
    });
}

async function UpdateContactByPk(pk: String, contact: IContact): Promise<any> {
  return Contact.findByIdAndUpdate( pk, { ...contact }, (error, data) => {
    if(error){
        throw error;
    } else {
      return data
    }
});
}

async function DeleteContactByPk(pk: String): Promise<any> {
  return Contact.findByIdAndRemove( pk, (error, data) => {
    if(error){
        throw error;
    } else {
      return data
    }
});
}

export default {
  CreateContact,
  FindContacts,
  FindContactByPk,
  DeleteContactByPk,
  UpdateContactByPk
};