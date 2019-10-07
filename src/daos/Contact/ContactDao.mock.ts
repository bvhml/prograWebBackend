import { IContact } from '@entities';
import { getRandomInt } from '@shared';
import { MockDaoMock } from '../MockDbC/MockDao.mock';
import { IContactDao } from './ContactDao';

export class ContactDao extends MockDaoMock implements IContactDao {

    public async getAll(): Promise<IContact[]> {
        try {
            const db = await super.openDb();
            return db.contacts;
        } catch (err) {
            throw err;
        }
    }

    public async getContact(pk: number): Promise<void> {
        try {
            const db = await super.openDb();
            var filtered = db.contacts.filter((contact:any) => {return Number(contact.pk) === Number(pk)})[0];
            if (filtered){
                return filtered;
            }
            throw new Error('Contact not found');
        } catch (err) {
            throw err;
        }
    }

    public async add(contact: IContact): Promise<void> {
        try {
            const db = await super.openDb();
            contact.pk = getRandomInt();
            db.contacts.push(contact);
            await super.saveDb(db);
        } catch (err) {
            throw err;
        }
    }

    public async update(contact: IContact): Promise<void> {
        try {
            const db = await super.openDb();
            for (let i = 0; i < db.contacts.length; i++) {
                if (db.contacts[i].pk === contact.pk) {
                    db.contacts[i] = contact;
                    await super.saveDb(db);
                    return;
                }
            }
            throw new Error('Contact not found');
        } catch (err) {
            throw err;
        }
    }

    public async delete(pk: number): Promise<void> {
        try {
            const db = await super.openDb();
            for (let i = 0; i < db.contacts.length; i++) {
                if (db.contacts[i].pk === pk) {
                    db.contacts.splice(i, 1);
                    await super.saveDb(db);
                    return;
                }
            }
            throw new Error('Contact not found');
        } catch (err) {
            throw err;
        }
    }
}
