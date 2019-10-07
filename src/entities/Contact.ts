
export interface IContact {
    pk?: number;
    title: string;
    name: string;
    last: string;
    email: string;
    id: string;
    nat: string;
    gen: string;
}

export class Contact implements IContact {

    public pk?: number;
    public title: string;
    public name: string;
    public last: string;
    public email: string;
    public id: string;
    public nat: string;
    public gen: string;

    constructor(nameOrUser: string | IContact, title:string, last: string, email: string, id:string, nat:string, gen:string) {
        if (typeof nameOrUser === 'string') {
            this.title = title;
            this.name = nameOrUser;
            this.last = last;
            this.email = email || '';
            this.id = id;
            this.nat = nat;
            this.gen = gen;
        } else {
            this.title = nameOrUser.title;
            this.name = nameOrUser.name;
            this.last = nameOrUser.last;
            this.email = nameOrUser.email;
            this.id = nameOrUser.id;
            this.nat = nameOrUser.nat;
            this.gen = nameOrUser.gen;
            
        }
    }
}
