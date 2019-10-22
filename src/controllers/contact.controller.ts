import Contact, { IContact } from '../models/contact.model';

interface ICreateContactInput {
  pk: IContact['pk'];
  email: IContact['email'];
  name: IContact['name'];
  id: IContact['id'];
  nat: IContact['nat'];
  gen: IContact['gen'];
}

async function CreateUser({
  pk,
  email,
  name,
  id,
  nat,
  gen
}: ICreateContactInput): Promise<IContact> {
  return Contact.create({
    pk,
    email,
    name,
    id,
    nat,
    gen
  })
    .then((data: IContact) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
}

export default {
  CreateUser
};