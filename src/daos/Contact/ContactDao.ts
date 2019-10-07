import { IContact } from '@entities';

export interface IContactDao {
    getAll: () => Promise<IContact[]>;
    add: (user: IContact) => Promise<void>;
    update: (user: IContact) => Promise<void>;
    delete: (id: number) => Promise<void>;
}

export class ContactDao implements IContactDao {

    /**
     *
     */
    public async getAll(): Promise<IContact[]> {
        // TODO
        return [] as any;
    }

    /**
     *
     * @param id
     */
    public async getContact(id: number): Promise<void> {
        // TODO
        return {} as any;
    }

    /**
     *
     * @param contact
     */
    public async add(contact: IContact): Promise<void> {
        // TODO
        return {} as any;
    }

    /**
     *
     * @param contact
     */
    public async update(contact: IContact): Promise<void> {
        // TODO
        return {} as any;
    }

    /**
     *
     * @param id
     */
    public async delete(id: number): Promise<void> {
        // TODO
        return {} as any;
    }
}
