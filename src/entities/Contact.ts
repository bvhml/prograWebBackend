export interface IName {
    title: string;
    first: string;
    last: string;
}

export interface IId {
    name: string;
    value: string;
}


export interface IContact {
    pk?: number;
    name: IName;
    email: string;
    id: IId;
    nat: string;
    gen: string;
}

export class Contact implements IContact {

    public pk?: number;
    public name: IName;
    public email: string;
    public id: IId;
    public nat: string;
    public gender: string;

    constructor(name: IName, email: string, id:IId, nat:string, gender:string) {
        /*if (typeof nameOrUser === 'string') {
            this.title = title;
            this.name = nameOrUser;
            this.last = last;
            this.email = email || '';
            this.id = id;
            this.nat = nat;
            this.gen = gen;
        } else {
            */
           
            this.name = name;
            this.email = email;
            this.id = id;
            this.nat = nat;
            this.gender = gender;
            
        
    }
}
